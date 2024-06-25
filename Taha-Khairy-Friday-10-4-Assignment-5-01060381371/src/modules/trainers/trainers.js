import Router from "express";
const trainersRouter = Router();

import * as trainersController from "./trainers.Controllers.js";

trainersRouter.post("/addtrainer", trainersController.addTrainer);
trainersRouter.get("/getalltrainers", trainersController.getAllTrainers);
trainersRouter.put("/updatetrainer/:id", trainersController.updateTrainer);
trainersRouter.delete("/deletetrainer/:id", trainersController.deleteTrainer);
trainersRouter.get("/gettrainer/:id", trainersController.getTrainer);

export default trainersRouter;
