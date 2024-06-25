import {
  loadMembersFromFile,
  members,
} from "../members/members.Controllers.js";
import fs from "fs";

const data = "./src/modules/trainerdata";
export let trainers = [];

export const loadTrainersFromFile = () => {
  const fileData = fs.readFileSync(data);
  trainers = JSON.parse(fileData);
};

export const updateTrainersFile = () => {
  fs.writeFileSync(data, JSON.stringify(trainers));
};

export const addTrainer = (req, res, next) => {
  const { id, name, duration } = req.body;
  const isExist = trainers.find((t) => t.id === id);
  if (isExist) {
    return res.status(404).json({ error: "this trainer is already exist" });
  }
  const newTrainer = { id, name, duration };
  trainers.push(newTrainer);
  console.log("A New Trainer Is Added!");
  updateTrainersFile();
  res.status(201).json(trainers);
};
export const getAllTrainersMembers = (req, res, next) => {
  loadTrainersFromFile();
  loadMembersFromFile();
  const trainerData = trainers.map((trainer) => {
    const trainerMembers = members.filter(
      (mem) => mem.trainerId === trainer.id
    );
    return { ...trainer, members: trainerMembers };
  });
  res.json(trainerData);
};
export const getTrainer = (req, res, next) => {
  loadTrainersFromFile();
  const { id } = req.params;
  const trainerIndex = trainers.findIndex((t) => t.id === id * 1);
  const findTrainer = trainers.find((t) => t.id === id * 1);
  if (!findTrainer) {
    return res.status(404).json({ error: "this trainer is not here" });
  }
  res.json(trainers[trainerIndex]);
};
export const updateTrainer = (req, res, next) => {
  loadTrainersFromFile();
  const { id } = req.params;
  const { name, duration } = req.body;
  const findIndex = trainers.findIndex((t) => t.id === id * 1);
  if (findIndex === -1) {
    res.status(404).json({ error: "this trainer is not here" });
  }
  trainers[findIndex].name = name;
  trainers[findIndex].duration = duration;
  updateTrainersFile();
  res.status(200).json(trainers[findIndex]);
};
export const deleteTrainer = (req, res, next) => {
  loadTrainersFromFile();
  const { id } = req.params;
  const findIndex = trainers.findIndex((t) => t.id === id * 1);
  if (findIndex === -1) {
    res.status(404).json({ error: "this trainer is already not here" });
  }
  const deletedTrainer = trainers.splice(findIndex, 1)[0];
  updateTrainersFile();
  res.status(200).json(deletedTrainer);
};
