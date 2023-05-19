import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const users = [
  {
    id: 1,
    username: "admin",
    password: "$2a$08$XKk6iM.icdQXzjg4p6iX4.2k/6WNYK4AozpRc9w5IiRkA7itMDUaq", // hashed password for 'password'
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  // @TODO: will be defined jwt_sercret
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(400).send("Invalid username or password");
});

export default router;
