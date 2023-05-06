import { RequestHandler } from "express";
import { User, UserModel } from "../models/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Config } from "../config/config";
import * as nodemailer  from 'nodemailer';
import Mailgen from "mailgen";

// use this middleware to hash password before saving to db
export const hashPasswordMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { password } = req.body;

    // bad request if password is less than 6 characters
    if (password.length < 6) {
      return res.status(400).send({
        status: 400,
        massage: "Password must be at least 6 characters",
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
    const { email, password, rememberMe } = req.body;

    // get user from db
    const user = await UserModel.findOne({ email });

    // bad request if user does not exist
    if (!user) {
      return res.status(400).send({ status: 400, message: "Invalid email" });
    }

    // authentication
    const isMatch = await bcrypt.compare(password, user.password);

    // bad request if password is incorrect
    if (!isMatch) {
      return res.status(400).send({ status: 400, message: "Invalid password" });
    }

    // expiration time by remember me
    const expiresIn = rememberMe ? "14d" : "1h";

    // generate a jwt
    const token = jwt.sign(
      { email: user.email, isLogged: true, isAdmin: user.isAdmin },
      Config.JWT_SECRET_KEY,
      { expiresIn }
    );

    return res.send({ token });
  } catch (e) {
    next(e);
  }
};

// middleware the authorize the user and continue if he logged in
export const authorizeMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .send({ status: 401, error: "Missing authorization header" });
    }

    // extract the token from authHeader
    const token = authHeader.split(" ")[1];
    const jwtData = jwt.verify(token, Config.JWT_SECRET_KEY);
    const { email, isLogged, isAdmin } = jwtData;
    req.authUser = { email, isLogged, isAdmin };
    next();
  } catch (e) {
    next(e);
  }
};

export const isAdminMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const isAdmin = req.authUser?.isAdmin;

    if (!isAdmin) {
      return res
        .status(403)
        .send({ status: 403, error: "You are not authorized" });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const validateEmailMiddleware: RequestHandler = async(req, res, next) => {
  try {
    const { email } = req.body;

    // get user from db
    const user = await UserModel.findOne({ email });

    // bad request if user does not exist
    if (!user) {
      return res.status(400).send({ status: 400, message: "Invalid email" });
    }
    next();
  } catch(e) {
    next(e);
  }
}

export const sendRenewPasswordEmail: RequestHandler = async(req, res, next) => {
  try {
      const { email } = req.body;
      const config = {
        service: 'gmail',
        auth: {
          user: Config.NODEMAILER_USER,
          pass: Config.NODEMAILER_PASS
        }
      };
      const transporter = nodemailer.createTransport(config);
      const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          name: 'DSRC - university of haifa',
          link: 'https://mailgen.js/'
        }
      });

      const expiresIn = "5m";
      let token = jwt.sign(
        { email: email},
        Config.JWT_SECRET_KEY,
        { expiresIn }
      );
        
      while(token.indexOf('?') > -1) {
        token = jwt.sign(
          { email: email},
          Config.JWT_SECRET_KEY,
          { expiresIn }
        );
      }

      const linkToSend = Config.FRONTEND_URL + '/renewPassword?' + token;

      const mailContent = {
        body: {
          name:'',
          intro: 'DSRC renew password link is attached AND VALID ONLY FOR 5 MINUTES, please click on it to renew your password',
          table: {
            data: [{
              link: `<a href="${linkToSend}">${linkToSend}</a>` 
            }]
          },
          outro: ""
        }
      };

      const mail = mailGenerator.generate(mailContent);
      const mailOptions = {
        from: Config.NODEMAILER_USER,
        to: email,
        subject: 'DSRC renew password link',
        html: mail
      };

      transporter.sendMail(mailOptions).then(() => {
        res.send({token: token});
      });

  }
  catch(e) {
    next(e);
  }
}

export const verifyJwtMiddleware: RequestHandler = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .send({ status: 401, error: "Missing authorization header" });
      }
  
      // extract the token from authHeader
      const token = authHeader.split(" ")[1];
      const jwtData = jwt.verify(token, Config.JWT_SECRET_KEY);
      res.send({result: 'verified!', user: jwtData});
  }
  catch(e) {
    next(e);

  }

}

export const updateUserDB: RequestHandler = async (req, res, next) => {
  try {
    const user: User = req.body;
    const userDB = await UserModel.updateOne({email: user.email}, {password: user.password}).exec();

    res.send(user);
  } catch (e) {
    next(e);
  }
};
