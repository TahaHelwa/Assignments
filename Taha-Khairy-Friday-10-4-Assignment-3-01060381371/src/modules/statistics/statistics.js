import Router from "express";
const statisticsRouter = Router();

import * as statisticsController from "./statistics.Controllers.js";

statisticsRouter.get("/getallrevenues", statisticsController.getAllRevenues);
statisticsRouter.get(
  "/getrevenuesoftrainer",
  statisticsController.getRevenuesOfTrainer
);
statisticsRouter.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found Error" });
});

export default statisticsRouter;
