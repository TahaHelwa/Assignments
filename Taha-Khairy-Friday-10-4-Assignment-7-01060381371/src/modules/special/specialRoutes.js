import { Router } from "express";
import * as specialControllers from "./specialControllers.js";

const specialRouter = Router();

specialRouter.get("/cars/models", specialControllers.getCarsByModel);
specialRouter.get(
  "/cars/available-models",
  specialControllers.getAvailableCarsByModel
);
specialRouter.get(
  "/cars/rented-or-model",
  specialControllers.getRentedOrSpecificModelCars
);
specialRouter.get(
  "/cars/avaiable-or-rented-model",
  specialControllers.getAvailableOrRentedSpecificModelCars
);

export default specialRouter;
