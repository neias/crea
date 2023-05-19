import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authController from "./controllers/authController";
import productsController from "./controllers/productsController";
import commentsController from "./controllers/commentsController";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/products", productsController);
app.use("/comments", commentsController);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
