import Router from "express";
const membersRouter = Router();

import * as membersController from "./members.Controllers.js";

membersRouter.get("/getallmembers", membersController.getAllMembersTrainer);
membersRouter.post("/addmember", membersController.addMember);
membersRouter.get("/getmember/:id", membersController.getMember);
membersRouter.put("/updatemember/:id", membersController.updateMember);
membersRouter.delete("/deletemember/:id", membersController.deleteMember);

membersRouter.use("*", (req, res) => {
  res.status(404).json({ message: "Error this API is not here " });
});

export default membersRouter;
