import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.JWTToken;

  if (!token) {
    return res.status(400).send({
      auth: false,
      message: "No token provided.",
    });
  }

  if (!JWT_SECRET) {
    return res
      .status(500)
      .send({ auth: false, message: "JWT_SECRET is not defined." });
  }

  jwt.verify(token, JWT_SECRET, (err: any) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    return next();
  });
};
