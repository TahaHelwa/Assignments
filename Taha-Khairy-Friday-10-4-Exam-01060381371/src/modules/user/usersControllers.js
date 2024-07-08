import User from "../../../DB/Models/User.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// Sign Up API
export const signUp = async (req, res, next) => {
  // destracting data from the user
  const {
    firstName,
    lastName,
    email,
    password,
    recoveryEmail,
    DOB,
    mobileNumber,
    role,
  } = req.body;
  try {
    // check if user is already exist
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User is already exist" });

    // add user name dynamicly
    let userName = `${firstName} ${lastName}`;

    // hashing password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // insert the user to the database
    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      recoveryEmail,
      DOB,
      mobileNumber,
      role,
    });

    // Save to the DB
    await newUser.save();

    return res.status(201).json({ msg: "Success Creating New User" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal Server Error", error: error.message });
  }
};

export const signIn = async (req, res, next) => {
  // dectract data from the user
  try {
    const { identifier, password } = req.body;

    // find user by mobileNumber or email
    let user = await User.findOne({
      $or: [{ email: identifier }, { mobileNumber: identifier }],
    });

    if (!user) return res.status(400).json({ msg: "Invalid Credintials" });

    // check if the password is valid or not
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({ msg: "Invalid Credintials!" });

    // User is Online for now
    await User.findOneAndUpdate({ _id: user.id }, { status: "Online" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "JopSearch&#$",
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ Msg: "Success SignIn", token });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal Server Error", error: error.message });
  }
};

export const updateAccount = async (req, res, next) => {
  // destract data from the body .
  const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } =
    req.body;
  try {
    // get id from the token ( authentication )
    const { id } = req.user;

    // check if the email is already exist in DB but not id we use
    if (await User.findOne({ email, _id: { $ne: id } }))
      return res.status(400).json({ msg: "Email already exists" });
    // check if the mobileNumber is already exist in DB but not id we use
    if (await User.findOne({ mobileNumber, _id: { $ne: id } }))
      return res.status(400).json({ msg: "Mobile number already exists" });

    // Object for the new data updated
    const newData = {
      email,
      mobileNumber,
      recoveryEmail,
      DOB,
      lastName,
      firstName,
    };
    await User.findByIdAndUpdate({ _id: id }, newData);
    return res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.user;

    // find user to delete
    const findUserAndDelete = await User.findByIdAndDelete({ _id: id });

    // check if the process done .
    if (!findUserAndDelete)
      return res.status(400).json({ msg: "User not found" });

    return res.status(200).json({ msg: "Account deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const getUserData = async (req, res, next) => {
  // get user account data
  try {
    const { id } = req.user;
    const findUser = await User.findById(id).select("-password");
    if (!findUser) return res.status(400).json({ Msg: "User Is not Here" });
    return res.status(200).json(findUser);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const getProfileDataForAnotherUser = async (req, res, next) => {
  // get the query from the user
  try {
    const { userId } = req.query;
    // check if ID is valid as and ObjectId or not
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).json({ error: "Not Valid Object Id" });
    // set user data after search by user id
    const user = await User.findById(userId).select([
      "-password",
      "-role",
      "-firstName",
      "-lastName",
      "-_id",
    ]);
    if (!user) return res.status(400).json({ msg: "this user is not here" });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Internal Server Error", error: error.message });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    // get id from the authentication middleware
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // validate the OldPasswork with the user entry
    const validPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid Old Password" });

    // hash new password
    const hashNewPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashNewPassword;
    await user.save();

    return res.status(400).json({ msg: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ data: "Internal Server Error", error: error.message });
  }
};

export const getAllAccounts = async (req, res, next) => {
  try {
    const { recoveryEmail } = req.query;
    const accounts = await User.find({ recoveryEmail });
    if (accounts.length === 0)
      return res.status(404).json({ msg: "No accounts found" });
    return res.status(200).json(accounts);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const forgetPassword = async (req, res, next) => {};
