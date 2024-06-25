import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const DBName = "CarRentalSystem";
let db;
export const db_connection = async () => {
  try {
    await client.connect();
    // create a database doesn't exist with it's name
    console.log("Connected to the DataBase");
  } catch (error) {
    console.log("error to connect the database!", error);
  }
};
db = client.db(DBName);
export { db };
