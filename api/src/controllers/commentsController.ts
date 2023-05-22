import express, { Request, Response } from "express";
import fs from "fs";
import { body, validationResult } from "express-validator";
import { verifyToken } from "../middlewares/verifyToken";
import path from "path";
import util from "util";

const router = express.Router();
const dataPath = path.join(__dirname, "..", "..", "data", "comments.json");
const readFile = util.promisify(fs.readFile);

const getComments = (): Promise<any> => {
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

const getComment = async (id: Number) => {
  try {
    const data = await readFile(dataPath, "utf8");
    const jsonData = JSON.parse(data);

    const result = jsonData.filter((item: any) => item.productId === id);

    if (result) {
      return result;
    } else {
      throw new Error(`No data found with id: ${id}`);
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addComment = (comment: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const comments = JSON.parse(data);
        const id = comments.length + 1;
        console.log(comments.length);
        const preComment = {
          id,
          ...comment,
        };
        comments.push(preComment);
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

router.get("/", verifyToken, async (_, res: Response) => {
  try {
    const comments = await getComments();
    console.log(comments);
    res.json(comments);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:productId", verifyToken, async (req: Request, res: Response) => {
  const { productId } = req.params;
  const comments = await getComment(Number(productId));

  res.status(200).json({ comments });
});

router.post(
  "/",
  [
    body("productId").isNumeric().withMessage("Product ID must be a number"),
    body("comment").notEmpty().withMessage("Comment is required"),
    body("score").isNumeric().notEmpty().withMessage("Score is required"),
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
