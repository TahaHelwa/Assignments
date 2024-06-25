import mysql2 from "mysql2";

const db_connection = mysql2.createConnection({
  host: "localhost", // or ip
  database: "gym_system_db",
  user: "root",
  password: "",
});
db_connection.connect((err) => {
  if (err) {
    console.log(err);
    console.log("connection error!");
  } else {
    console.log("connected to the database");
  }
});
export default db_connection;
