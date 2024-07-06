import mongoose from "mongoose";

const db_connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/JopSearchApp");
    console.log("Connected to the database!");
  } catch (error) {
    console.log("fail to connect to the DB");
  }
};

export default db_connection;
