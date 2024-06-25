import express from "express";
import { db_connection } from "./DB/connection.js";
import customerRouter from "./src/modules/customers/customersRoutes.js";
import carRouter from "./src/modules/cars/carsRoutes.js";
import rentalRouter from "./src/modules/rentals/rentalsRoutes.js";
import specialRouter from "./src/modules/special/specialRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

db_connection();

app.use("/customer", customerRouter);
app.use("/car", carRouter);
app.use("/rental", rentalRouter);
app.use("/special", specialRouter);

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
