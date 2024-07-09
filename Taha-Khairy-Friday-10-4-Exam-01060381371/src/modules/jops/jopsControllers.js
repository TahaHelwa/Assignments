import { isValidObjectId } from "mongoose";
import Job from "../../../DB/Models/Jop.models.js";
import Company from "../../../DB/Models/Company.models.js";
import Application from "../../../DB/Models/Application.models.js";
export const addJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
    } = req.body;
    const newJob = new Job({
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
      addedBy: req.user._id,
    });
    await newJob.save();
    if (!newJob)
      return res
        .status(400)
        .json({ msg: "Their is a problem in adding a new job" });
    return res.status(200).json({ msg: "Success adding A Job", job: newJob });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
export const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const {
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
    } = req.body;

    if (isValidObjectId(jobId))
      return res.status(400).json({ msg: "Invalid ID" });

    const updateJob = await Job.findByIdAndUpdate(
      { _id: jobId },
      {
        jobTitle,
        jobLocation,
        workingTime,
        seniorityLevel,
        jobDescription,
        technicalSkills,
        softSkills,
      }
    );
    if (!updateJob)
      return res.status(400).json({ msg: "this Job Is NOT Here" });
    return res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
export const deleteJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    if (!isValidObjectId(jobId))
      return res.status(400).json({ msg: "Invalid ID" });

    const job = await Job.findByIdAndDelete({ _id: jobId });
    if (!job) return res.status(400).json({ msg: "Job Not Here" });
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
export const getAllJobsWithTheirCompanys = async (req, res, next) => {
  try {
    const jobs = await Job.find().populate("addedBy");
    if (!jobs) return res.status(400).json({ msg: "there is no Jobs!" });
    return res.status(200).json(jobs);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
export const getAllJobsMatchsFilters = async (req, res, next) => {
  try {
    const {
      workingTime,
      jobLocation,
      seniorityLevel,
      jobTitle,
      technicalSkills,
    } = req.query;

    const filterCriteria = {};
    if (workingTime) filterCriteria.workingTime = workingTime;
    if (jobLocation) filterCriteria.jobLocation = jobLocation;
    if (seniorityLevel) filterCriteria.seniorityLevel = seniorityLevel;
    if (jobTitle) filterCriteria.jobTitle = new RegExp(jobTitle, "i");
    if (technicalSkills)
      filterCriteria.technicalSkills = new RegExp(technicalSkills, "i");
    const jobs = await Job.find(filterCriteria);
    res.status(200).json(jobs);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
export const getJobsForSpecificCompany = async (req, res, next) => {
  try {
    const { companyName } = req.query;
    const company = await Company.findOne({ companyName });
    if (!company) return res.status(404).json({ msg: "Company not found" });

    const jobs = await Job.find({ addedBy: company.companyHR });
    if (!jobs) return res.status(400).json({ msg: "Not Found Jobs" });

    return res.status(200).json(jobs);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
export const applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { userTechSkills, userSoftSkills, userResume } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const newApplication = new Application({
      jobId: jobId,
      userId: req.user._id,
      userTechSkills,
      userSoftSkills,
      userResume,
    });

    await newApplication.save();
    res.status(201).json({
      msg: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", Error: error.message });
  }
};
