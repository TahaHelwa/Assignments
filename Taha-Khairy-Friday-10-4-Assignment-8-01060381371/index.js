import express from "express";
import { db_connection } from "./DB/connection.js";
import autherRouter from "./src/modules/authers/authersRoutes.js";
import booksRouter from "./src/modules/books/booksRoutes.js";

const app = express();
const port = 3000;

db_connection();

app.use(express.json());
app.use("/auther", autherRouter);
app.use("/book", booksRouter);

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
