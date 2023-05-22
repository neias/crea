import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const users = [
  {
    id: 1,
    username: "user",
    password: "$2a$10$c4kaRcuFZpa4EdgUXBdtKOfh3ApJfUqYX056KlOJpuzb2guceyCdG", // user123
  },
];

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });

    const serialized = serialize("JWTToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      secure: false,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ token });
  }

  res.status(401).json({
    error: {
      type: "info",
      message: "Username or password is incorrect.",
    },
  });
});

router.get("/logout", (req, res) => {
  const { cookies } = req;

  const jwt = cookies?.JWTToken;

  if (!jwt) {
    return res.json({
      message: "already logged out",
    });
  }

  const serialized = serialize("JWTToken", "", {
    httpOnly: true,
    secure: false,
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  res.status(200).json({ message: "successfully logged out" });
});

export default router;
