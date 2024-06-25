import { Car } from "../../../DB/Models/Car.models.js";

//Get all cars whose model is ‘Honda’ and ‘Toyota’ (using query params)
export const getCarsByModel = async (req, res, next) => {
  try {
    const { models } = req.query;
    const modelsList = models ? models.split(",") : [];
    const findCar = await Car.find({ model: { $in: modelsList } }).toArray();
    if (!findCar[0])
      return res.status(404).json({ msg: "Not Found Cars With These Models" });
    return res.status(200).json({ msg: findCar });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error In getCarByModel API " + error.message });
  }
};

// Get Available Cars of a Specific Model
export const getAvailableCarsByModel = async (req, res, next) => {
  try {
    const { model } = req.query;
    const findCar = await Car.find({
      model: model,
      rentalStatus: "available",
    }).toArray();
    if (!findCar[0])
      return res.status(404).json({ msg: "this Car is Not Available Or Here" });
    return res.status(200).json({ result: findCar });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error In getAvailableCarsByModel API " + error.message });
  }
};

// Get Cars that are Either rented or of a Specific Model
export const getRentedOrSpecificModelCars = async (req, res, next) => {
  try {
    const { model } = req.query;
    const findCars = await Car.find({
      $or: [{ rentalStatus: "rented" }, { model: model }],
    }).toArray();
    if (!findCars[0])
      return res.status(404).json({ msg: "Niether Model Nor Rented " });
    return res.status(200).json({ msg: findCars });
  } catch (error) {
    return res.status(500).json({
      msg: "error In getRentedOrSpecificModelCars API " + error.message,
    });
  }
};

// Get Available Cars of Specific Models or Rented Cars of a Specific Model
export const getAvailableOrRentedSpecificModelCars = async (req, res, next) => {
  try {
    const { models, rentalModel } = req.query;
    const modelsList = models ? models.split(",") : [];
    const findCar = await Car.find({
      $or: [
        { rentalStatus: "rented", model: rentalModel },
        { rentalStatus: "available", model: { $in: modelsList } },
      ],
    }).toArray();
    if (!findCar[0])
      return res
        .status(404)
        .json({ msg: "Available Or Rented models not Exist" });
    return res.status(200).json({ msg: findCar });
  } catch (error) {
    return res.status(500).json({
      msg:
        "error In getAvailableOrRentedSpecificModelCars API " + error.message,
    });
  }
};
