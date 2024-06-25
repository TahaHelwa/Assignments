import express from "express";

import membersRouter from "./src/modules/members/members.js";
import trainersRouter from "./src/modules/trainers/trainers.js";
import statisticsRouter from "./src/modules/statistics/statistics.js";

const app = express();
app.use(express.json());

app.use("/members", membersRouter);
app.use("/trainers", trainersRouter);
app.use("/statistics", statisticsRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`the server is running of port ${port}...`);
});
