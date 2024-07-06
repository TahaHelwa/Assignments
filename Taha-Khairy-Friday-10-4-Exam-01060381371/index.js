import express from "express";
import db_connection from "./DB/connection.js";

const app = express();
const port = 3000;

app.use(express.json());

db_connection();

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
