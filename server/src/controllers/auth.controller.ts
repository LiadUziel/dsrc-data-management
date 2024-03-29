import { RequestHandler } from "express";
import { Role, User, UserModel } from "../models/user.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Config } from "../config/config";
import * as nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { Mail } from "../models/mail.interface";
import {
  GrantProposal,
  GrantProposalModel,
} from "../models/grant-proposal.interface";

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
    let user: User = req.body;

    user = await initUserRoles(user);
    await initFullName(user);

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
      { email: user.email, isLogged: true, roles: user.roles },
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
    const jwtData = jwt.verify(token, Config.JWT_SECRET_KEY) as {
      email: string;
      isLogged: boolean;
      roles: string[];
    };
    const { email, isLogged, roles } = jwtData;
    req.authUser = { email, isLogged, roles };
    next();
  } catch (e) {
    next(e);
  }
};

export const isAdminMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const roles = req.authUser?.roles;

    if (!roles?.includes("admin")) {
      return res
        .status(403)
        .send({ status: 403, error: "You are not authorized" });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const validateEmailMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body.userData ? req.body.userData : req.body;

    // get user from db
    const user = await UserModel.findOne({ email });

    // bad request if user does not exist
    if (!user) {
      return res.status(400).send({ status: 400, message: "Invalid email" });
    }
    next();
  } catch (e) {
    next(e);
  }
};

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
    res.send({ result: "verified!", user: jwtData });
  } catch (e) {
    next(e);
  }
};

export const updateUserDB: RequestHandler = async (req, res, next) => {
  try {
    const user: User = req.body;
    const userDB = await UserModel.updateOne(
      { email: user.email },
      { password: user.password }
    ).exec();

    res.send(user);
  } catch (e) {
    next(e);
  }
};

export const sendEmailWithLinkMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    /*req = {UserData, emailConfig}*/
    const user: User = req.body.userData;
    const mailToUser: Mail = req.body.emailConfig;
    const config = {
      service: "gmail",
      auth: {
        user: Config.NODEMAILER_USER,
        pass: Config.NODEMAILER_PASS,
      },
    };
    const transporter = nodemailer.createTransport(config);
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "DSRC - university of haifa",
        link: "https://mailgen.js/",
      },
    });

    const expiresIn = "5m";
    let token = jwt.sign({ user: user }, Config.JWT_SECRET_KEY, { expiresIn });

    while (token.indexOf("?") > -1) {
      token = jwt.sign({ user: user }, Config.JWT_SECRET_KEY, { expiresIn });
    }

    const linkToSend = Config.FRONTEND_URL + mailToUser.url + token;

    const mailContent = {
      body: {
        name: "",
        intro: mailToUser.content,
        table: {
          data: [
            {
              link: `<a href="${linkToSend}">${linkToSend}</a>`,
            },
          ],
        },
        outro: "",
      },
    };

    const mail = mailGenerator.generate(mailContent);
    const mailOptions = {
      from: Config.NODEMAILER_USER,
      to: user.email,
      subject: mailToUser.subject,
      html: mail,
    };

    transporter.sendMail(mailOptions).then(() => {
      res.send({ token: token });
    });
  } catch (e) {
    next(e);
  }
};

export const validateEmailNotExistMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body.userData;

    // get user from db
    const user = await UserModel.findOne({ email });

    // bad request if user exists
    if (user) {
      return res
        .status(400)
        .send({ status: 400, message: "email already exists at the system" });
    }
    next();
  } catch (e) {
    next(e);
  }
};

// get details of logged user
export const getLoggedUser: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.authUser!;

    // get user from db
    const user: User = (await UserModel.findOne(
      { email },
      "firstName lastName email roles -_id"
    ))!;

    return res.send(user);
  } catch (e) {
    next(e);
  }
};

// get all users except the logged in user
export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.authUser!;

    // get user from db
    const users: User[] = (await UserModel.find(
      { email: { $ne: email } },
      "firstName lastName email roles -_id"
    ))!;

    return res.send(users);
  } catch (e) {
    next(e);
  }
};

/**
 * Initialization of roles of a new registered user if there are proposals in which he has a special role such as: reviewer, admin, or team member
 */
async function initUserRoles(user: User) {
  user.roles = ["submitter"];

  const proposals: GrantProposal[] = await GrantProposalModel.find();

  for (const proposal of proposals) {
    if (proposal.teamMembers) {
      for (const member of proposal.teamMembers) {
        const { memberEmail, memberRole: role } = member;

        // New role for given user
        if (user.email === memberEmail && !user.roles.includes(role)) {
          user.roles.push(role);
        }
      }
    }
  }
  return user;
}

// init full names in teamMembers and reviews if the email is exist in these proposals
async function initFullName(user: User) {
  const proposals = await GrantProposalModel.find();

  for (const proposal of proposals) {
    // proposal id if should update the document
    let idForUpdate: string | null = null;

    if (proposal.teamMembers) {
      for (const member of proposal.teamMembers) {
        if (member.memberEmail === user.email) {
          idForUpdate = proposal._id;
          member.fullName = `${user.firstName} ${user.lastName}`;
        }
      }
    }

    if (proposal.reviews) {
      for (const review of proposal.reviews) {
        if (review.writerEmail === user.email) {
          idForUpdate = proposal._id;
          review.fullName = `${user.firstName} ${user.lastName}`;
        }
      }
    }

    if (idForUpdate) {
      await GrantProposalModel.findByIdAndUpdate(idForUpdate, proposal);
    }
  }
}
