//
const express = require("express");
// const userRoutes = require("./routes/userRoutes");
const app = express();
const bodyParser = require("body-parser");
const PORT = 5555;

const cors = require("cors");
// middleware
app.use(cors());
// app.use(bodyParser.json());

// Connection to MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const { default: router } = require("./routes/userRoutes");
const uri = "mongodb://localhost:27017";
// "mongodb+srv://bookstore:root@mydb.f04kebr.mongodb.net/?retryWrites=true&w=majority&appName=MyDB";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collections of documents
    const booksCollections = client.db("BookCollection").collection("books");
    const usersCollections = client.db("BookCollection").collection("users");

    // inset a book to the db using post mehtod
    app.post("/upload-book", async (req, res) => {
      try {
        const data = req.body;

        // validation for inserting data
        if (
          !data.imageURL ||
          !data.authorName ||
          !data.category ||
          !data.bookDescription ||
          !data.bookTitle ||
          !data.bookPDFURL
        ) {
          res.status(400).send("Please provide all the required fields");
          return;
        }
        const result = await booksCollections.insertOne(data);
        res.status(201).send(result);
      } catch (err) {}
    });

    // get a single book from the db using get method
    app.get("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const book = await booksCollections.findOne({ _id: ObjectId(id) });
        if (!book) {
          res
            .status(404)
            .send("Sorry can't find the book you are looking for!!");
          return;
        }
        res.json(book);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // get all books from the db using get method
    // app.get("/all-books", async (req, res) => {
    //   try {
    //     const books = booksCollections.find();
    //     const result = await books.toArray();
    //     res.send(result);
    //   } catch (err) {
    //     console.log(err);
    //     res.status(400).send("Sorry no books are available at the moment");
    //   }
    // });

    // update a book in the db using put method
    app.put("/update-book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedData = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            ...updatedData,
          },
        };
        const result = await booksCollections.updateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    // delete a book from the db using delete method
    app.delete("/delete-book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await booksCollections.deleteOne(filter);
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });

    // find by category
    app.get("/all-books", async (req, res) => {
      try {
        let query = {};
        if (req.query?.category) {
          query = { category: req.query.category };
        }
        const result = await booksCollections.find(query).toArray();
        res.send(result);
      } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
    });
    // app.use("/api/user", userRoutes);

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/books", (req, res) => {
  res.send("Hello books");
});
