import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      required: true,
      type: String,
    },
    jobLocation: {
      type: String,
      enum: ["Onsite", "Remotely", "Hybrid"],
      required: true,
    },
    workingTime: {
      type: String,
      enum: ["part-time", "full-time"],
      required: true,
    },
    seniorityLevel: {
      type: String,
      enum: ["Junior", "Mid-Level", "Senior", "CTO"],
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    technicalSkills: {
      type: String,
      required: true,
    },
    softSkills: {
      type: String,
      required: true,
    },
    addedBy: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamp: true }
);
const Job = mongoose.model("Job", jobSchema);
export default Job || mongoose.models.Job;
