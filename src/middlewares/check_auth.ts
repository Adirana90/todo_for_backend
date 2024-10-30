import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.headers["cookie"];
  const cookieObtain = cookie && cookie.length > 0;

  if (!cookieObtain) {
    res.status(401).json({
      message: "please login before accessing",
    });
    return;
  }

  const token = cookie.split("=")[1];

  // validate the cookie token
  const verifiedTokenOutput = verifyToken(token);

  if (!verifiedTokenOutput.isValid) {
    res.status(401).json({
      error: verifiedTokenOutput.message,
    });
    return;
  }
  req.user = verifiedTokenOutput.payload as any;
  next();
}
