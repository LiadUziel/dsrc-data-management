import { RequestHandler } from "express";
import { Product, ProductModel } from "../models/product.interface";
import { User, UserModel } from "../models/user.interface";
import { NewFieldRaw } from "../models/new-field-raw.interface";

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const product: Product = req.body;

    // get user from db
    const user: User = (await UserModel.findOne({
      email: req.authUser?.email,
    }))!;

    // add user to product
    product.user = user;

    // add application date
    product.applicationDate = new Date();

    // init blogStatus
    product.blogStatus = "DID_NOT_SUBMIT";

    const productDb = await ProductModel.create(product);

    return res.status(201).send(productDb);
  } catch (e) {
    next(e);
  }
};

/* get proposals from db (all of them or by logged user or by user 
  its proposal chosen when clicking watch products bottom)*/
export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    let email;
    if (Object.keys(req.query).length === 0) {
      if (!req.authUser?.roles.includes("admin")) {
        email = req.authUser?.email;
      }
    } else {
      email = req.query["email"];
    }
    const user: User = (await UserModel.findOne({
      email: email,
    }))!;
    // get products from db
    const products = await ProductModel.find(user ? { user: user._id } : {})
      .populate("user", "firstName lastName email -_id")
      .sort({ applicationDate: -1 });
    return res.send(products);
  } catch (e) {
    next(e);
  }
};

// add fields to product
export const addFieldsToProduct: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newFieldsArr: NewFieldRaw[] = req.body.fields;

    // build new fields object
    const customFields: { [key: string]: string } = newFieldsArr.reduce(
      (acc, curr) => {
        acc[curr.fieldName] = curr.value;
        return acc;
      },
      {}
    );

    const updatedProposal = await ProductModel.findByIdAndUpdate(
      id,
      { $set: { customFields } },
      {
        new: true,
      }
    );

    return res.send(updatedProposal);
  } catch (e) {
    next(e);
  }
};

// update product blog status
export const updateProductBlogStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const { blogStatus } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $set: { blogStatus } },
      {
        new: true,
      }
    );

    return res.send(updatedProduct);
  } catch (e) {
    next(e);
  }
};
