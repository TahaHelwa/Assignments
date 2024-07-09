import Company from "../../../DB/Models/Company.models.js";
import Application from "../../../DB/Models/Application.models.js";
import { isValidObjectId } from "mongoose";

export const addCompany = async (req, res, next) => {
  const {
    companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
  } = req.body;
  const companyHR = req.user._id;

  try {
    const findCompany = await Company.findOne({ companyName });
    if (findCompany)
      return res
        .status(400)
        .json({ msg: "We already have a company with this Name" });
    // create object to contain the data
    const newCompany = new Company({
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
      companyHR,
    });
    await newCompany.save();
    return res.status(201).json({ msg: "Company Created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const updateCompanyData = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const {
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
    } = req.body;

    const updateCompany = await Company.findByIdAndUpdate(
      { _id: companyId },
      {
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
      }
    );
    if (!updateCompany)
      return res.status(400).json({ msg: "This Company Is NOT Here!!" });
    return res.status(200).json({ msg: "Updated Successfully", updateCompany });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const deleteCompanyData = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    if (!isValidObjectId(companyId))
      return res.status(400).json({ msg: "Invalid Id" });
    const company = await Company.findByIdAndDelete({ _id: companyId });
    if (!company)
      return res.status(400).json({ msg: "This Company Is Already NOT HERE" });
    return res.status(200).json({ msg: "Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const getCompanyData = async (req, res, next) => {
  try {
    const { companyId } = req.params;

    if (!isValidObjectId(companyId))
      return res.status(400).json({ error: "Invalid Company Id" });

    const company = await Company.findById({ _id: companyId }).populate(
      "companyHR",
      "-password"
    );
    if (!company) return rse.status(400).json({ msg: "Not Found Company!" });

    // Find jobs related to the company
    const jops = await Jop.find({ company: companyId });

    // Respond with company data and related jobs
    return res.status(200).json({ company, jops });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const searchForCompanyWithName = async (req, res, next) => {
  try {
    const { companyName } = req.query;
    // check company with name
    const company = await Company.find({
      companyName: new RegExp(companyName, "i"),
    });
    if (!company)
      return res.status(400).json({ msg: "This Company is Not Here" });

    // return the company
    return res.status(200).json(company);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const getAllApplicationsForSpecificJop = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId: jobId })
      .populate("userId", "-password")
      .populate("jopId");
    if (!applications.length)
      return res.status(400).json({ msg: "Their is no Applications" });
    return res.status(200).json(applications);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};
