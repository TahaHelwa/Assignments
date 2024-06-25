import db_connection from "../../../DB/Models/connection.js";

// Add Member (must be unique)
export const addMember = (req, res, next) => {
  const {
    name,
    nationalId,
    phoneNumber,
    membership_from,
    membership_to,
    membership_cost,
    status,
    trainerId,
  } = req.body;

  const insertQuery = `INSERT INTO members 
    (name,nationalId,phoneNumber,membership_from,membership_to,membership_cost,status,trainerId)
    VALUES ('${name}','${nationalId}',
    '${phoneNumber}','${membership_from}','${membership_to}',
    '${membership_cost}','${status}','${trainerId}')`;

  db_connection.execute(insertQuery, (err, result) => {
    if (err) {
      return res.json({ message: "query error", error: err.message });
    }
    //console.log(result);
    if (!result.affectedRows) {
      return res.json({ message: "User Not Added!!!" });
    }
    return res.json({ message: "User Added Successfully!" });
  });
};
// Get all Members and Member's Trainer
export const getAllMembersTrainer = (req, res, next) => {
  const selectQuery = `SELECT * FROM members LEFT JOIN trainers ON members.trainerId = trainers.id;`;
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      return res.json({ message: "wrong query !" });
    }

    return res.json(result);
  });
};
// Get a specific Member
export const getMember = (req, res, next) => {
  const { nationalId } = req.params;
  const selectQuery = `SELECT * FROM members WHERE nationalId = '${nationalId}' AND status = 'active'`;
  db_connection.execute(selectQuery, (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    //console.log(result);
    if (result.length === 0) {
      return res.json({
        error: "No active member found with the provided nationalId",
      });
    }
    return res.json(result);
  });
};
// Update Member (name, membership, trainer id)
export const updateMember = (req, res, next) => {
  const { nationalId } = req.params;
  const { name, membership_from, membership_to, membership_cost, trainerId } =
    req.body;
  const updateQuery = `UPDATE members 
  SET name='${name}',
  membership_from='${membership_from}',
  membership_to='${membership_to}',
  membership_cost='${membership_cost}',
  trainerId = '${trainerId}'
  WHERE nationalId = '${nationalId}'`;
  const selectQuery = `SELECT * FROM members WHERE nationalId = '${nationalId}'`;
  db_connection.execute(updateQuery, (err, result) => {
    if (err) {
      return res.json({ error: "this is a query error!" });
    }
    if (result.affectedRows === 0) {
      return res.json("this Member is not here already");
    }
    db_connection.execute(selectQuery, (err, result) => {
      if (err) {
        return res.json({ error: "query error" });
      }
      res.json({ result: result });
    });
  });
};
// Delete Member (soft delete)
export const deleteMember = (req, res, next) => {
  const { nationalId } = req.params;
  const deleteQuery = `DELETE FROM members WHERE nationalId= '${nationalId}'`;
  db_connection.execute(deleteQuery, (err, result) => {
    if (err) return res.json({ error: "query error in deleteQuery!" });
    if (res.affectedRows === 0)
      return res.json({ message: "this member is not found " });
    return res.json({ message: "Deleted Successfully:)" });
  });
};
