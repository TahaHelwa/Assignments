import db_connection from "../../../DB/Models/connection.js";

// Get all revenues of all members.
export const getAllRevenues = (req, res, next) => {
  const getSumQuery = `SELECT SUM(membership_cost) AS Total_sum From members`;
  db_connection.execute(getSumQuery, (err, result) => {
    if (err) {
      return res.json({ error: "Query Error" });
    }
    if (!result[0])
      return res.json({ message: "There Is No One In The Gym Yet!" });
    return res.json(result);
  });
};

// Get the revenues of a specific trainer.
export const getRevenuesOfTrainer = (req, res, next) => {
  const { id } = req.params;
  const getQuery = `SELECT membership_cost FROM members WHERE trainerId = '${id}';`;
  db_connection.execute(getQuery, (err, result) => {
    if (err) {
      return res.json({ Error: "Query Error" });
    }
    if (!result.length) {
      return res.json({ Message: "this body no longer here" });
    }
    return res.json(result);
  });
};
