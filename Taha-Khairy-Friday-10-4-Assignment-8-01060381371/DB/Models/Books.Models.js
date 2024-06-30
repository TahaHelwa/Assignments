import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    auther: {
      type: String,
      require: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("Book", bookSchema);
export default book || mongoose.models.Book;
