const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (booksCollection) => {
  router.get("/", async (req, res) => {
    try {
      const books = await booksCollection.find().toArray();
      res.json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const book = await booksCollection.findOne({ _id: new ObjectId(id) });
      if (!book) {
        res.status(404).send("Book not found");
        return;
      }
      res.json(book);
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newBook = req.body;

      // Check if a book with the same title already exists
      const existingBook = await booksCollection.findOne({
        bookTitle: newBook.bookTitle,
      });

      if (existingBook) {
        return res.status(400).send("Book with the same title already exists");
      }

      // If no book with the same title exists, insert the new book
      const result = await booksCollection.insertOne(newBook);
      res.status(201).send(result);
    } catch (err) {
      console.error("Error creating book:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedBook = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedBook,
      };
      const result = await booksCollection.updateOne(filter, updateDoc);
      if (result.matchedCount === 0) {
        res.status(404).send("Book not found");
        return;
      }
      res.send("Book updated successfully");
    } catch (err) {
      console.error("Error updating book:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).send("Book not found");
        return;
      }
      res.json(result);
    } catch (err) {
      console.error("Error deleting book:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
