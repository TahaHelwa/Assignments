import Auther from "../../../DB/Models/Auther.Models.js";

export const addAuther = async (req, res, next) => {
  try {
    // create a new auther by getting from the user (name , bio , birthDate , books)
    const { name, bio, birthDate, books } = req.body;

    // check if the data types valid or not
    if (typeof name !== "string" || typeof bio !== "string")
      return res.status(400).json({ msg: "Invalid Data Type" });

    // create an Object contain the feilds
    const newOne = {
      name,
      bio,
      birthDate,
      books,
    };
    const newAuther = await Auther.create(newOne);
    return res
      .status(200)
      .json({ msg: "Success Creating a new Auther ", newAuther });
  } catch (error) {
    return res.status(500).json({ msg: "Auther API Error ", error });
  }
};
export const getAllAuthers = async (req, res, next) => {
  try {
    const findedAuthers = await Auther.find();
    if (!findedAuthers[0])
      return res.status(400).json({ msg: "there is now authers Here" });
    return res.status(200).json(findedAuthers);
  } catch (error) {
    return res.status(500).json({ msg: "getAllAuthers API error", error });
  }
  // get authers
};
// add a new feature
export const getAutherWithLimits = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, bio } = req.query;

    const query = {};

    if (name) query.name = new RegExp(name, "i");
    if (bio) query.bio = new RegExp(bio, "i");

    const authers = await Auther.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Auther.countDocuments(query);

    res.status(200).json({
      authers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuther = async (req, res, next) => {
  try {
    // get the id form the user
    const { id } = req.params;
    // get books data in auther data by using populate .
    const findAuther = await Auther.findById({ _id: id }).populate("books");
    if (!findAuther)
      return res.status(404).json({ MSG: "This Auther is not here" });
    return res.status(200).json(findAuther);
  } catch (error) {
    return res.status(500).json({ msg: "getAuther API error", error });
  }
};
export const updateAuther = async (req, res, next) => {
  try {
    // get the feilds forn the user
    const { id } = req.params;
    const { bio, books, name } = req.body;
    // updated opject
    const updatedAuther = {
      bio,
      books,
      name,
    };
    const findAuther = await Auther.findByIdAndUpdate(
      { _id: id },
      updatedAuther
    );

    // chenck if the auther is not found
    if (!findAuther)
      return res.status(200).json({ msg: "this auther Is not here" });

    // success update
    return res.status(200).json({ msg: "Updated Successfully", findAuther });
  } catch (error) {
    return res.status(500).json({ msg: "updateAuther API error", error });
  }
};
export const deleteAuther = async (req, res, next) => {
  try {
    // get id form the user
    const { id } = req.params;
    const findAuther = await Auther.findByIdAndDelete({ _id: id });
    if (!findAuther)
      return res.status(200).json({ msg: "this auther is aready not here" });
    return res.status(200).json({ msg: "Deleted Successfully", findAuther });
  } catch (error) {
    return res.status(500).json({ msg: "getAuther API error", error });
  }
};
