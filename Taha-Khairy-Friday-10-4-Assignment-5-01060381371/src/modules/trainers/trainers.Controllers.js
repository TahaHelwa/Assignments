import db_connection from "../../../DB/Models/connection.js";

// Add a trainer.
export const addTrainer = (req, res, next) => {
  const { name, duration_from, duration_to } = req.body;
  const insertQuery = `INSERT INTO trainers (name,duration_from,duration_to) 
  VALUES ('${name}','${duration_from}','${duration_to}');`;
  db_connection.execute(insertQuery, (err, result) => {
    if (err) return res.json({ error: "Error Query :(" });
    if (!result.affectedRows) return res.json({ error: "User Is Not Added!!" });
    return res.json({ result: "user is added Successfully :)" });
  });
};
// Get all trainers and trainer’s members.
export const getAllTrainers = (req, res, next) => {
  const selectQuery = `SELECT * FROM trainers LEFT JOIN members ON trainers.id = members.trainerId`;
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      return res.json({ error: "Wrong Query!" });
    }
    if (result.length === 0) {
      return res.json({ message: "There Is No Trainers Members" });
    }
    return res.json({ result: result });
  });
};
// Update trainer by id.
export const updateTrainer = (req, res, next) => {
  const { id } = req.params;
  const { name, duration_from, duration_to } = req.body;
  const updateQuery = `UPDATE trainers SET name='${name}',
  duration_from= '${duration_from}',duration_to='${duration_to}'
  WHERE id='${id}'`;
  db_connection.execute(updateQuery, (err, result) => {
    if (err) return res.json({ error: "Query Error Check it!" });
    if (result.affectedRows === 0) {
      return res.json({ message: "No thing happened!!" });
    }
    return res.json({ message: "Updated Successfully", result: result });
  });
};
// Delete trainer.
export const deleteTrainer = (req, res, next) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM trainers WHERE id= '${id}';`;
  db_connection.execute(deleteQuery, (err, result) => {
    if (err) {
      return res.json({ error: "Query Error" });
    }
    if (result.affectedRows === 0) {
      return res.json({ message: "The trainer is already not here!!" });
    }
    res.json({ Done: "Successfully Deleted " });
  });
};
// Get a specific trainer and trainer’s members
export const getTrainer = (req, res, next) => {
  const { id } = req.params;
  const getQuery = `SELECT * FROM trainers WHERE id = '${id}';`;
  db_connection.execute(getQuery, (err, result) => {
    if (err) return res.json({ error: "query error" });
    if (!result.length) {
      return res.json({ message: "there is no trianer with this id" });
    }
    return res.json({ result: result });
  });
};
