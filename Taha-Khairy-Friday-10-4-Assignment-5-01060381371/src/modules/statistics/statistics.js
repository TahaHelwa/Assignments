import Router from "express";
const statisticsRouter = Router();

import * as statisticsControllers from "./statistics.Controllers.js";

statisticsRouter.get("/getallrevenues", statisticsControllers.getAllRevenues);
statisticsRouter.get(
  "/getrevenuesoftrainer/:id",
  statisticsControllers.getRevenuesOfTrainer
);
statisticsRouter.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found Error" });
});

export default statisticsRouter;
