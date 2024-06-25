import { ObjectId, ReturnDocument } from "mongodb";
import { Car } from "../../../DB/Models/Car.models.js";
import { Rental } from "../../../DB/Models/Rentals.models.js";

export const createRental = async (req, res, next) => {
  try {
    const { carId, customerId, rentalDate, returnDate } = req.body;

    //check the car by carId
    const findCar = await Car.findOne({ _id: new ObjectId(carId) });

    // check if the car is here and available
    if (!findCar || findCar.rentalStatus === "rented")
      return res.status(400).json({ msg: "This car is not available" });

    // rental new Opject
    const newRental = {
      carId: new ObjectId(carId),
      customerId: new ObjectId(customerId),
      rentalDate: new Date(rentalDate),
      returnDate: new Date(returnDate),
    };
    const rentalResult = await Rental.insertOne(newRental);
    if (!rentalResult) return res.status(404).json({ msg: "Can't this car" });
    const carStatus = await Car.updateOne(
      { _id: new ObjectId(carId) },
      {
        $set: { rentalStatus: "rented" },
      }
    );
    return res.status(202).json({ msg: "Success Rental ", rentalResult });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "createRental Api Error " + error.message });
  }
};
export const updateRental = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { returnDate } = req.body;

    // check if the ID is valid one
    if (!ObjectId.isValid(_id))
      return res.json({ msg: "This is not a valid type ID" });

    // convert id To object Id
    const rentId = new ObjectId(_id);

    // Find a Rental and update it
    const result = await Rental.findOneAndUpdate(
      { _id: rentId },
      {
        $set: { returnDate: new Date(returnDate) },
      },
      { returnDocument: "after" }
    );

    // check if the rent is found and updated or not
    if (!result) return res.status(404).json({ msg: "The rent is not Found" });

    // If the rental is updated to reflect the return, update the car status to available
    if (new Date(returnDate) <= new Date()) {
      await Car.updateOne(
        { _id: result.value.carId },
        {
          $set: { rentalStatus: "available" },
        }
      );
    }

    return res.status(200).json({ msg: "Success Update", result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "updateRental Api Error " + error.message });
  }
};
export const deleteRental = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!ObjectId.isValid(_id))
      return res.json({ msg: "This is a Wrong Id Type" });

    const id = new ObjectId(_id);
    const findRental = await Rental.findOne({ _id: id });
    if (!findRental)
      return res.status(404).json({ msg: "this rental is not here Already" });

    const deleteRental = await Rental.deleteOne({ _id: id });
    const changeStatus = await Car.findOneAndUpdate(
      { _id: findRental.carId },
      {
        $set: { rentalStatus: "avaliable" },
      }
    );
    return res.status(200).json({ msg: "Deleted Successfully", deleteRental });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "deleteRental Api Error " + error.message });
  }
};
export const getAllRentals = async (req, res, next) => {
  try {
    const findAll = await Rental.find().toArray();
    if (!findAll[0]) return res.json({ msg: "We Have No Rentals" });
    return res.status(200).json({ data: findAll });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "getAllRentals Api Error " + error.message });
  }
};
export const getRental = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!ObjectId.isValid(_id))
      return res.status(400).json({ msg: "Type ID is not valid" });
    const findRental = await Rental.findOne({ _id: new ObjectId(_id) });
    if (!findRental) return res.status(404).json({ msg: "Not found Rental" });
    return res
      .status(200)
      .json({ msg: "We find the Rent You Want", result: findRental });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "getRental Api Error " + error.message });
  }
};
