import express from "express";
import { config } from "dotenv";

import { globaleResponse } from "./src/Middlewares/index.js";
import db_connection from "./DB/connection.js";
import * as router from "./src/Modules/index.js";

config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/categories", router.categoryRouter);
app.use("/brands", router.brandRouter);

app.use(globaleResponse);

db_connection();

app.get("/", (req, res) => res.send("Hello From the server"));
app.listen(port, () => console.log(`app listening on port ${port}!`));