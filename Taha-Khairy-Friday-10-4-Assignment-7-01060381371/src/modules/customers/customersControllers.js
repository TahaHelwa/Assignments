import { Customer } from "../../../DB/Models/Customers.models.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
export const signup = async (req, res, next) => {
  // name , email , password , phoneNumber .
  const { name, email, password, phoneNumber } = req.body;
  try {
    const existCustomer = await Customer.findOne({ email });
    if (existCustomer) {
      return res
        .status(400)
        .json({ message: "this customer is aready exist!" });
    }
    const hashedpassword = bcrypt.hashSync(password, 10);
    const newCustomer = await Customer.insertOne({
      name,
      email,
      password: hashedpassword,
      phoneNumber,
    });
    return res
      .status(201)
      .json({ message: "Success adding a new customer", newCustomer });
  } catch (error) {
    return res
      .status(500)
      .json({ Message: "Signup API Error: ", error: error.message });
  }
};
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await Customer.findOne({ email });
    if (!emailExist)
      return res.status(401).json({ message: "Customer Not Found" });
    const validPassword = bcrypt.compareSync(password, emailExist.password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    return res.status(202).json({ Message: "Success Login" });
  } catch (error) {
    return res
      .status(500)
      .json({ Message: "Signin API Error: ", error: error.message });
  }
};
export const getUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const isExist = await Customer.findOne({ _id: new ObjectId(_id) });
    if (!isExist) return res.status(404).json({ msg: "Customer Not Found" });
    return res.status(202).json({ msg: isExist });
  } catch (error) {
    return res.status(500).json({ msg: "Get Customer Error" + error.message });
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const allCustomers = await Customer.find().toArray();
    if (!allCustomers)
      return res.status(404).json({ message: "there is not customers now!" });
    return res.status(200).json({ Customers: allCustomers });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Get All Cutomers API Error: " + error.message });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const { name, email } = req.body;

    // Validate ObjectId before converting it
    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ msg: "This ID is not valid" });
    }

    const isExist = await Customer.findOne({ _id: new ObjectId(_id) });
    // check if ID is exist Or not
    if (!isExist) return res.status(404).json({ msg: "this Id is not here" });

    const result = await Customer.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name, email } },
      { returnDocument: "after" }
    );

    return res.status(200).json({ msg: "successful update", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Update User API Error: " + error.message });
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.params;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ msg: "This ID is not valid" });
    }
    // Convert _id to ObjectId
    const userId = new ObjectId(_id);

    // Check if the user exists
    const isExist = await Customer.findOne({ _id: userId });
    if (!isExist) {
      return res.status(404).json({ msg: "This customer is already not here" });
    }

    // delete operation
    const result = await Customer.deleteOne({ _id: userId });

    // Check if the deletion was successful
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "This customer is already not here" });
    }

    // Return Successful Message and the result
    return res.status(200).json({ msg: "Success Delete", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Delete User API Error: " + error.message });
  }
};
