import Router from "express";
const trainersRouter = Router();

import * as trainersControllers from "./trainers.Controllers.js";

trainersRouter.post("/addtrainer", trainersControllers.addTrainer);
trainersRouter.get(
  "/getalltrainers",
  trainersControllers.getAllTrainersMembers
);
trainersRouter.put("/updatetrainer/:id", trainersControllers.updateTrainer);
trainersRouter.delete("/deletetrainer/:id", trainersControllers.deleteTrainer);
trainersRouter.get("/gettrainer/:id", trainersControllers.getTrainer);

trainersRouter.use("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found Error!!" });
});

export default trainersRouter;
