import {
  loadMembersFromFile,
  members,
} from "../members/members.Controllers.js";

export const getAllRevenues = (req, res, next) => {
  loadMembersFromFile();
  const revenues = members.reduce((total, member) => {
    return total + member.membership.cost;
  }, 0);
  res.json({ monthly: revenues, yaerly: revenues * 12 });
};
export const getRevenuesOfTrainer = (req, res, next) => {
  // all trainer have the same cost
  const revenues = 400 * 12;
  res.json({ revenues });
};
