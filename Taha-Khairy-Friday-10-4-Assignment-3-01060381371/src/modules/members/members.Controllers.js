import {
  loadTrainersFromFile,
  trainers,
} from "../trainers/trainers.Controllers.js";
import fs from "fs";
const data = "./src/modules/memberdata";

export let members = [];

export const loadMembersFromFile = () => {
  const fileData = fs.readFileSync(data);
  members = JSON.parse(fileData);
};

export const updateMembersFile = () => {
  fs.writeFileSync(data, JSON.stringify(members));
};
// Add Member (must be unique)
export const addMember = (req, res, next) => {
  const { id, name, nationalId, phoneNumber, status, trainerId } = req.body;
  const memberExist = members.find((mem) => mem.id === id);
  if (memberExist) {
    return res.status(401).json({ error: "this member is here" });
  }
  const newMember = {
    id,
    name,
    nationalId,
    phoneNumber,
    membership: {
      type: "Paid Membership",
      cost: 400,
      duration: 12,
    },
    status,
    trainerId,
  };
  members.push(newMember);
  updateMembersFile();
  res.status(201).json(members);
};

// Get all Members and Member's Trainer
export const getAllMembersTrainer = (req, res, next) => {
  loadMembersFromFile();
  loadTrainersFromFile();
  const memberData = members.map((member) => {
    const membersTrainer = trainers.filter(
      (trainer) => trainer.id === member.trainerId
    );
    return { ...member, trainer: membersTrainer };
  });
  res.json(memberData);
};

// Get a specific Member
export const getMember = (req, res, next) => {
  loadMembersFromFile();
  const { id } = req.params;
  const memberIndex = members.findIndex((mem) => (mem.id = id));
  const member = members.find((mem) => mem.id === id);
  if (!member) {
    return res.status(404).json({ error: "404 Not Found Error" });
  }
  // the I cannot handle the date for now
  // don't forget to code it taha
  res.json(members[memberIndex]);
};

// Update Member (name, membership, trainer id)
export const updateMember = (req, res, next) => {
  loadMembersFromFile();
  const { id } = req.params;
  const { name, membership, trainerId } = req.body;
  const memberIndex = members.findIndex((mem) => mem.id == id);
  if (!memberIndex) {
    return res.status(404).json({ message: "404 Not Found" });
  }
  members[memberIndex].name = name;
  members[memberIndex].membership = membership;
  members[memberIndex].trainerId = trainerId;
  updateMembersFile();
  res.json(members[memberIndex]);
};

// Delete Member (soft delete)
export const deleteMember = (req, res, next) => {
  loadMembersFromFile();
  const { id } = req.params;
  // i feel exausted to predict that id is string that is why all the time memberIndex = -1 all the time.
  const memberIndex = members.findIndex((mem) => mem.id === id * 1);
  if (memberIndex === -1) {
    return res.status(404).json({ error: "404 Not Found" });
  }
  const deletedMember = members.splice(memberIndex, 1)[0];
  updateMembersFile();
  res.json(deletedMember);
};
