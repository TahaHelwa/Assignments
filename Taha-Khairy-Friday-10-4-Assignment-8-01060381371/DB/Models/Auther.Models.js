// Schema
// Model
import mongoose from "mongoose";

// create auther Schema
const autherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamp: true }
);
const auther = mongoose.model("Auther", autherSchema);
export default auther || mongoose.models.Auther;
