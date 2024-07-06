import Router from "express";
import * as rentalControllers from "./rentalsControllers.js";
const rentalRouter = Router();

rentalRouter.post("/createrental", rentalControllers.createRental);
rentalRouter.put("/updaterental/:_id", rentalControllers.updateRental);
rentalRouter.delete("/deleterental/:_id", rentalControllers.deleteRental);
rentalRouter.get("/getrental/:_id", rentalControllers.getRental);
rentalRouter.get("/getallrentals", rentalControllers.getAllRentals);

export default rentalRouter;
