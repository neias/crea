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
    // password: "$2a$08$XKk6iM.icdQXzjg4p6iX4.2k/6WNYK4AozpRc9w5IiRkA7itMDUaq", // hashed password for 'password'
    password: "$2a$10$c4kaRcuFZpa4EdgUXBdtKOfh3ApJfUqYX056KlOJpuzb2guceyCdG", // user123
  },
];

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  // @TODO: will be defined jwt_sercret
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1m",
    });

    const serialized = serialize("CreaJWT", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      secure: false,
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ token });
  }

  res.status(400).send("Invalid username or password");
});

export default router;
