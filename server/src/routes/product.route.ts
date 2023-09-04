import { Router } from "express";
import {
  authorizeMiddleware,
  isAdminMiddleware,
} from "../controllers/auth.controller";
import { addFieldsToProduct, createProduct, getProducts, updateProductBlogStatus } from "../controllers/products.controller";

const productRouter = Router();

// Create a new product in db //* POST /api/product
productRouter.post("/", authorizeMiddleware, createProduct);

// get all products //* GET /api/product get by studyTitle and email /api/product/:studyTitle/:email
productRouter.get(
  "/",
  authorizeMiddleware,
  isAdminMiddleware,
  getProducts
);

// get products of logged user //* GET /api/product/logged-user
productRouter.get("/logged-user", authorizeMiddleware, getProducts);

// add fields to product //* PATCH /api/product/add-fields
productRouter.patch(
  "/add-fields/:id",
  authorizeMiddleware,
  isAdminMiddleware,
  addFieldsToProduct
);

// update product blog status
//* PATCH /api/product/update-blog-status/:id
productRouter.patch(
  "/update-blog-status/:id",
  authorizeMiddleware,
  isAdminMiddleware,
  updateProductBlogStatus
);

export default productRouter;