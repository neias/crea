import express, { Request, Response } from "express";
import fs from "fs";
import { body, validationResult } from "express-validator";
import { verifyToken } from "../middlewares/verifyToken";
import path from "path";

const router = express.Router();
const dataPath = path.join(__dirname, "..", "..", "data", "comments.json");

const getComment = (): Promise<any> => {
  return new Promise((resolve, rejects) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        rejects(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const addComment = (comment: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile(dataPath, JSON.stringify(comments, null, 2), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
};

router.get("/", async (_, res: Response) => {
  try {
    const comments = await getComment();
    res.json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post(
  "/",
  verifyToken,
  [
    body("productId").isNumeric().withMessage("Product ID must be a number"),
    body("username").notEmpty().withMessage("Username is required"),
    body("comment").notEmpty().withMessage("Comment is required"),
    body("addedDate").isDate().withMessage("Added Date must be a date"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await addComment(req.body);
      res.status(201).send();
    } catch (err) {
      res.status(500).send();
    }
  }
);

export default router;
