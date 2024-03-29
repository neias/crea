import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import authController from "./controllers/authController";
import productsController from "./controllers/productsController";
import commentsController from "./controllers/commentsController";

const app = express();

const FRONT_HOST = process.env.FRONT_HOST;

var corsOptions = {
  origin: FRONT_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authController);
app.use("/products", productsController);
app.use("/comments", commentsController);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
