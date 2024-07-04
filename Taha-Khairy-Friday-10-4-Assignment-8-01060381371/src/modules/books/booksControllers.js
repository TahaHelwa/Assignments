import book from "../../../DB/Models/Books.Models.js";

// API for adding a new book
export const createBook = async (req, res, next) => {
  try {
    // create a new book (title , content , auther , publishedDate)'
    const { title, content, auther, publishedDate } = req.body;

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof auther !== "string"
    )
      return res.status(401).json({ msg: "invalid type" });

    const findByTitle = await book.findOne({ title });

    // check if the book with this name is here or not
    if (findByTitle)
      return res.status(404).json({ msg: "The same book is here" });

    // create a new object to get all data from req.body
    const newBook = {
      title,
      content,
      auther,
      publishedDate,
    };

    // create the new book
    await book.create(newBook);

    // return response
    return res.status(200).json({ msg: "New Book Added ", newBook });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error in createBook api ", error: error.message });
  }
};
// Les't get all the books we have in the store
export const getAllBooks = async (req, res, next) => {
  try {
    // check if we have books then we return it if not return we have no books
    const findBooks = await book.find();
    if (!findBooks)
      return res.status(200).json({ msg: "There Is No book Until NOW !" });
    return res.status(200).json(findBooks);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error in getAllBooks api ", error: error.message });
  }
};
// add a new feature
export const getBooksWithLimits = async (req, res) => {
  try {
    const { page = 1, limit = 10, title, author } = req.query;

    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");

    const books = await book
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await book.countDocuments(query);

    res.status(200).json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// API for getting a book by id
export const getBook = async (req, res, next) => {
  try {
    // get the id from the user
    const { id } = req.params;

    // find the book by id
    const findBook = await book.findById({ _id: id });

    // check if the book found
    if (!findBook)
      return res.status(404).json({ msg: "This found Is not here!" });

    return res.status(200).json(findBook);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error in getBook api ", error: error.message });
  }
};
// API for updating a book
export const updateBook = async (req, res, next) => {
  try {
    // get the update types from the user
    const { id } = req.params;
    const { title, content } = req.body;
    if (typeof title !== "string" || typeof content !== "string") {
      return res.json({ msg: "Enter Valid argument" });
    }

    const findBook = await book.findById({ _id: id });

    // check if the id is here
    if (!findBook)
      return res
        .status(404)
        .json({ msg: "Can't find this book to update it!" });

    // update the book object
    const newData = {
      title,
      content,
    };
    const updatedBook = await book.updateOne(newData);
    return res
      .status(200)
      .json({ msg: "updated Successfully", data: updatedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error in getBook api ", error: error.message });
  }
};
// API for deleting a book
export const deleteBook = async (req, res, next) => {
  try {
    // get the id from req.params
    const { id } = req.params;
    const findBookAndDelete = await book.findByIdAndDelete({ _id: id });
    // check if the book is here or not
    if (!findBookAndDelete)
      return res.status(200).json({ msg: "This Book Is Aready Not here" });
    // return response to the user
    return res
      .status(200)
      .json({ msg: "Success Delete", data: findBookAndDelete });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error in getBook api ", error: error.message });
  }
};
