import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

type TGenerateTokenInput = {
  email: string;
  username: string;
};

const secretKey = "random_secret";

export function generateToken(payload: TGenerateTokenInput) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60,
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    const verified = jwt.verify(token, secretKey);
    return {
      isValid: true,
      message: "token verified",
      payload: verified,
    };
  } catch (e) {
    console.error(e);

    if (e instanceof TokenExpiredError) {
      return {
        isValid: false,
        message: e.message,
        payload: null,
      };
    } else if (e instanceof JsonWebTokenError) {
      return {
        isValid: false,
        message: e.message,
        payload: null,
      };
    }
    return {
      isValid: false,
      message: "something went wrong when verifying token",
      payload: null,
    };
  }
}
