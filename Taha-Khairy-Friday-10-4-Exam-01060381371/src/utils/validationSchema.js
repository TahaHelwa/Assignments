import Joi from "joi";

// User validation schema
export const userValidationSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  recoveryEmail: Joi.string().email().optional(),
  DOB: Joi.date().required(),
  mobileNumber: Joi.string().required(),
  role: Joi.string().valid("User", "Company_HR").required(),
});

// Job validation schema
export const jobValidationSchema = Joi.object({
  jobTitle: Joi.string().required(),
  jobLocation: Joi.string().valid("Onsite", "Remote", "Hybrid").required(),
  workingTime: Joi.string().valid("Part-time", "Full-time").required(),
  seniorityLevel: Joi.string()
    .valid("Junior", "Mid-Level", "Senior", "CTO")
    .required(),
  jobDescription: Joi.string().required(),
  technicalSkills: Joi.string().required(),
  softSkills: Joi.string().required(),
});

// Company validation schema
export const companyValidationSchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  industry: Joi.string().required(),
  address: Joi.string().required(),
  numberOfEmployees: Joi.string()
    .valid("1-10", "11-20", "21-50", "51-100", "101-200", "201-500", "500+")
    .required(),
  companyEmail: Joi.string().email().required(),
});

// Apply to Job validation schema
export const applyToJobValidationSchema = Joi.object({
  userTechSkills: Joi.array().items(Joi.string()).required(),
  userSoftSkills: Joi.array().items(Joi.string()).required(),
  userResume: Joi.string().required(),
});
