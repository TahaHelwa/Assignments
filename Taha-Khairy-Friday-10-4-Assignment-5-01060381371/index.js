import express from "express";
import db_connection from "./DB/Models/connection.js";
import membersRouter from "./src/modules/members/members.js";
import trainersRouter from "./src/modules/trainers/trainers.js";
import statisticsRouter from "./src/modules/statistics/statistics.js";

const app = express();
const port = 3100;
app.use(express.json());

// database connection
db_connection;
// members router
app.use("/members", membersRouter);

// members trainers
app.use("/trainers", trainersRouter);

// members statistics
app.use("/statistics", statisticsRouter);

app.listen(port, () => {
  console.log(`hello from port ${port}!!!`);
});
