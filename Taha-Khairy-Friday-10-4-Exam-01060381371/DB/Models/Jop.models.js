import mongoose from "mongoose";

const jopSchema = new mongoose.Schema(
  {
    jopTitle: {
      required: true,
      type: String,
    },
    jopLocation: {
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
const Jop = mongoose.model("Jop", jopSchema);
export default Jop || mongoose.models.Jop;
