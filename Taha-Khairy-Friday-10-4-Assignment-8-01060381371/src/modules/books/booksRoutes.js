import { Router } from "express";
import * as booksControllers from "./booksControllers.js";

const booksRouter = Router();

booksRouter.post("/addbook", booksControllers.createBook);
booksRouter.get("/getallbooks", booksControllers.getAllBooks);
booksRouter.get("/getbookswithlimits", booksControllers.getBooksWithLimits);
booksRouter.get("/getbook/:id", booksControllers.getBook);
booksRouter.put("/updatebook/:id", booksControllers.updateBook);
booksRouter.delete("/deletebook/:id", booksControllers.deleteBook);

export default booksRouter;
