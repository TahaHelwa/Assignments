import { Router } from "express";
import * as jobsControllers from "./jopsControllers.js";
import { authenticate } from "../../middlewares/authentication.middleware.js";
import { authorizeRole } from "../../middlewares/authorization.middleware.js";

const jobRouter = Router();

jobRouter.post(
  "/add",
  authenticate,
  authorizeRole("Company_HR"),
  jobsControllers.addJob
); // Add Job
jobRouter.put(
  "/update/:jobId",
  authenticate,
  authorizeRole("Company_HR"),
  jobsControllers.updateJob
); // Update Job
jobRouter.delete(
  "/delete/:jobId",
  authenticate,
  authorizeRole("Company_HR"),
  jobsControllers.deleteJob
); // Delete Job
jobRouter.get(
  "/all",
  authenticate,
  jobsControllers.getAllJobsWithTheirCompanys
); // Get all Jobs with company info
jobRouter.get(
  "/company",
  authenticate,
  jobsControllers.getJobsForSpecificCompany
); // Get Jobs by company name
jobRouter.get("/filter", authenticate, jobsControllers.getAllJobsMatchsFilters); // Get filtered Jobs
jobRouter.post(
  "/apply/:jobId",
  authenticate,
  authorizeRole("Company_HR"),
  jobsControllers.applyToJob
); // Apply to Job

export default jobRouter;
