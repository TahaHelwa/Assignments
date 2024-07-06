import { Router } from "express";
import * as carController from "./carsControllers.js";
const carRouter = Router();

carRouter.post("/addcar", carController.addCar);
carRouter.get("/getcar/:_id", carController.getCar);
carRouter.get("/getallcars", carController.getAllCars);
carRouter.put("/updatecar/:_id", carController.updateCar);
carRouter.delete("/deletecar/:_id", carController.deleteCar);

export default carRouter;
