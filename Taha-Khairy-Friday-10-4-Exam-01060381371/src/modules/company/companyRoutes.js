import { Router } from "express";
import { authenticate } from "../../middlewares/authentication.middleware.js";
import { authorizeRole } from "../../middlewares/authorization.middleware.js";
import * as companyControllers from "./companyControllers.js";
import { companyValidationSchema } from "../../utils/validationSchema.js";
import validateRequest from "../../middlewares/validation.middleware.js";

const companyRouter = Router();

companyRouter.post(
  "/add",
  authenticate,
  authorizeRole("Company_HR"),
  validateRequest(companyValidationSchema),
  companyControllers.addCompany
);
companyRouter.put(
  "/update/:companyId",
  authenticate,
  authorizeRole("Company_HR"),
  validateRequest(companyValidationSchema),
  companyControllers.updateCompanyData
);
companyRouter.delete(
  "/delete/:companyId",
  authenticate,
  authorizeRole("Company_HR"),
  companyControllers.deleteCompanyData
);
companyRouter.get(
  "/get/:companyId",
  authenticate,
  authorizeRole("Company_HR"),
  companyControllers.getCompanyData
);
companyRouter.get(
  "/search",
  authenticate,
  authorizeRole("Company_HR"),
  companyControllers.searchForCompanyWithName
);
companyRouter.get(
  "/getall/:jobId",
  authenticate,
  authorizeRole("Company_HR"),
  companyControllers.getAllApplicationsForSpecificJop
);

export default companyRouter;
