import express from "express";
import { config } from "dotenv";

// Importing required modules and files
import { globaleResponse } from "./src/middlewares/index.js";
import db_connection from "./DB/connection.js";
import * as router from "./src/Modules/index.js";

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/categories", router.categoryRouter);
app.use("/sub-categories", router.subCategoryRouter);
app.use("/brands", router.brandRouter);
app.use("/products", router.productRouter);
app.use("/users", router.userRouter);

// Error handling middleware
app.use(globaleResponse);

db_connection();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
