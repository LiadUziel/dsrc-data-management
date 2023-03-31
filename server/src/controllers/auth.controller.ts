import { RequestHandler } from "express";
import { User, UserModel } from "../models/user.interface";
import bcrypt from "bcryptjs";

// use this middleware to hash password before saving to db
export const hashPasswordMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { password } = req.body;

    // bad request if password is less than 8 characters
    if (password.length < 8) {
      return res.status(400).send({
        status: 400,
        massage: "Password must be at least 8 characters",
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update password to hashed password
    req.body.password = hashedPassword;

    next();
  } catch (e) {
    next(e);
  }
};

// create user in db
export const createUserDB: RequestHandler = async (req, res, next) => {
  try {
    const user: User = req.body;

    const userDB = await UserModel.create(user);

    return res.send(userDB);
  } catch (e) {
    next(e);
  }
};

// login user include decrypt password and returns if admin
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // get user from db
    const user = await UserModel.findOne({ email });

    // bad request if user does not exist
    if (!user) {
      return res.status(400).send({ status: 400, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // bad request if password is incorrect
    if (!isMatch) {
      return res.status(400).send({ status: 400, message: "Invalid password" });
    }

    return res.send({ isLogged: true, isAdmin: user.isAdmin });
  } catch (e) {
    next(e);
  }
};
