import mongoose from "mongoose";

export const db_connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookStore");
    console.log("connected to the datebase!");
  } catch (error) {
    console.log("database connection error", error.message);
  }
};
