import { ObjectId } from "mongodb";
import { Car } from "../../../DB/Models/Car.models.js";
export const addCar = async (req, res, next) => {
  try {
    const { name, model } = req.body;
    const newCar = await Car.insertOne({
      name,
      model,
      rentalStatus: "available",
    });
    return res.status(202).json({ msg: newCar, customer: decodedData.email });
  } catch (error) {
    return res.status(500).json({ msg: "addCar Api error " + error.message });
  }
};
export const getCar = async (req, res, next) => {
  try {
    const { _id } = req.params;

    if (!ObjectId.isValid(_id))
      return res.status(404).json({ msg: "Not Valid Car Id" });
    const carId = new ObjectId(_id);
    const result = await Car.findOne(carId);
    if (!result) return res.status(404).json({ msg: "Not Found Car" });

    return res.status(200).json({ msg: "The Car is here ", data: result });
  } catch (error) {
    return res.status(500).json({ msg: "getCar Api error " + error.message });
  }
};
export const getAllCars = async (req, res, next) => {
  try {
    const result = await Car.find().toArray();
    if (!result[0])
      return res.status(404).json({ msg: "there is no car here" });
    return res.status(200).json({ msg: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "getAllCars Api error " + error.message });
  }
};
export const updateCar = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { name, model } = req.body;
    if (!ObjectId.isValid(_id))
      return res.status(404).json({ msg: "this Id is not valid" });

    const carId = new ObjectId(_id);
    const result = await Car.findOneAndUpdate(
      { _id: carId },
      { $set: { name, model } }
    );

    if (!result) return res.status(404).json({ msg: "This car Is Not Found" });
    return res.status(200).json({ msg: "Success Update", finalUpdate: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "updateCar Api error " + error.message });
  }
};
export const deleteCar = async (req, res, next) => {
  try {
    const { _id } = req.params;

    if (!ObjectId.isValid(_id))
      return res.status(404).json({ msg: "Incorrect carId" });
    const carId = new ObjectId(_id);
    const result = await Car.deleteOne({ _id: carId });
    if (!result.deletedCount)
      return res.status(404).json({ msg: "Car is Aleardy Not here" });
    return res.status(200).json({ msg: "Deleted Successfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "deleteCar Api error " + error.message });
  }
};
