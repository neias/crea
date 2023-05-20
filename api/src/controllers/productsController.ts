import express, { Request, Response } from "express";
import fs from "fs";
import util from "util";
import path from "path";
import { body, validationResult } from "express-validator";

import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();
const dataPath = path.join(__dirname, "..", "..", "data", "products.json");
const readFile = util.promisify(fs.readFile);

const getProducts = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

const getProduct = async (id: Number) => {
  try {
    const data = await readFile(dataPath, "utf8");
    const jsonData = JSON.parse(data);

    const result = jsonData.find((item: any) => item.id === id);

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

router.get("/", async (_, res: Response) => {
  try {
    const products = await getProducts();

    res.status(200).json({ products });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:productId", async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await getProduct(Number(productId));

  res.status(200).json({ product });
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("score").isNumeric().withMessage("Score must be a number"),
    body("addedDate").isDate().withMessage("Added Date must be a date"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

export default router;
