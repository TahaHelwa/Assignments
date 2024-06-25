import Router from "express";
const membersRouter = Router();

import * as membersController from "./members.Controllers.js";

membersRouter.post("/addmember", membersController.addMember);
membersRouter.get("/getallmembers", membersController.getAllMembersTrainer);
membersRouter.get("/getmember/:nationalId", membersController.getMember);
membersRouter.put("/updatemember/:nationalId", membersController.updateMember);
membersRouter.delete(
  "/deletemember/:nationalId",
  membersController.deleteMember
);

membersRouter.use("*", (req, res) => {
  res
    .status(404)
    .json({ members_router_message: "Error this API is not here " });
});

export default membersRouter;
