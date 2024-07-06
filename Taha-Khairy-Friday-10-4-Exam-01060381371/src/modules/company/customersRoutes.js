import { Router } from "express";
import * as customerController from "./customersControllers.js";
const customerRouter = Router();

customerRouter.post("/addcustomer", customerController.signup);
customerRouter.get("/login", customerController.signIn);
customerRouter.get("/getcustomer/:_id", customerController.getUser);
customerRouter.get("/getallcustomers", customerController.getAllUsers);
customerRouter.put("/updatecustomer", customerController.updateUser);
customerRouter.delete("/deletecustomer", customerController.deleteUser);

export default customerRouter;
