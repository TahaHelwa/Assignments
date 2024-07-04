import { Router } from "express";
import * as autherControllers from "./authersControllers.js";
const autherRouter = Router();

autherRouter.post("/addauther", autherControllers.addAuther);
autherRouter.get("/getallauthers", autherControllers.getAllAuthers);
autherRouter.get("/getauther/:id", autherControllers.getAuther);
autherRouter.get("/getautherwithlimits", autherControllers.getAutherWithLimits);
autherRouter.put("/updateauther/:id", autherControllers.updateAuther);
autherRouter.delete("/delete/:id", autherControllers.deleteAuther);

export default autherRouter;
