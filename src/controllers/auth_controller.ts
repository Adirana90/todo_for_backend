import { NextFunction, Request, Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../mongoose/auth_user/user_query";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateOTP } from "../utils/otp";
import { generateToken } from "../utils/jwt";
import { sendOtpToUsers } from "../utils/sendEmail";

type TSignupControllerInput = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body as TSignupControllerInput;
    console.log("body", body);

    // do the validation using zod or any other schema validators

    const userByEmail = await getUserByEmail(body.email);
    if (userByEmail) {
      res.status(400).json({
        message: `User already exists by email - ${body.email}`,
      });
      return;
    }
    const userByUserName = await getUserByUsername(body.username);
    if (userByUserName) {
      res.status(400).json({
        message: `User already exists by username - ${body.username}`,
      });
      return;
    }

    // hash the password before saving
    const hashedPassword = await hashPassword(body.password);

    // can now save in the db
    await createUser({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      username: body.username,
      password: hashedPassword,
    });

    /**
     * Send email to the user for email verification
     */
    const otp = generateOTP();
    // console.log("otp", otp);
    sendOtpToUsers({
      to: body.email,
      subject: "otp for verificatin",
      text: `your otp is ${otp}`,
    });

    res.json({
      message: "Your account has been created.",
    });
  } catch (err) {
    console.error(err);
    next((err as Error).message);
  }
}

type TLoginControllerInput = {
  username: string;
  password: string;
};

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body as TLoginControllerInput;

    const userByUserName = await getUserByUsername(body.username);
    if (!userByUserName) {
      res.status(400).json({
        message: `User does not exist by username - ${body.username}`,
      });
      return;
    }

    // check the password
    const isMatched = await comparePassword(
      body.password,
      userByUserName.password
    );
    if (!isMatched) {
      res.status(400).json({
        message: "Invalid username or password",
      });
      return;
    }

    // create session based
    // steps
    /**
     * 1. make a session key and save in the storage
     * 2. send the session key in cookie
     */

    // token based
    // steps
    /**
     * 1. make a token (access token) =>
     * 2. send the token in the cookie
     */

    const token = generateToken({
      email: userByUserName.email,
      username: userByUserName.username,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
      path: "/",
      sameSite: "lax",
    });

    res.status(200).json({
      message: "you are logged in",
    });
  } catch (error) {
    console.error(error);
    next((error as Error).message);
  }
}

export async function meController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loggedInUsername = req.user?.username || "";
    const user = await getUserByUsername(loggedInUsername);
    res.status(200).json({
      //   data: verifiedTokenOutput.payload,
      data: user,
    });
  } catch (e) {
    console.log(e);
    next((e as Error).message);
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      Message: "you are logged out",
    });
  } catch (e) {
    console.log(e);
    next((e as Error).message);
  }
}
