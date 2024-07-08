import { Router } from "express";
import * as userControllers from "./usersControllers.js";
import { authenticate } from "../../middlewares/authentication.middleware.js";

const userRouter = Router();

userRouter.post("/add", userControllers.signUp);
userRouter.post("/signin", userControllers.signIn);
userRouter.get("/getprofile", userControllers.getProfileDataForAnotherUser);
userRouter.put("/update", authenticate, userControllers.updateAccount);
userRouter.delete("/delete", authenticate, userControllers.deleteAccount);
userRouter.get("/getuserdata", authenticate, userControllers.getUserData);
userRouter.put("/updatepassword", authenticate, userControllers.updatePassword);
userRouter.post("/forgetpassword", userControllers.forgetPassword);
userRouter.get("/getaccounts", userControllers.getAllAccounts);

export default userRouter;
