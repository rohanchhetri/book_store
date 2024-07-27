const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const PORT = require("./port");

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());
app.use(bodyParser.json());

async function run() {
  try {
    await client.connect();

    const db = client.db("BookCollection");
    const booksCollection = db.collection("books");
    const usersCollection = db.collection("users");

    const bookRoutes = require("./routes/bookRoutes")(booksCollection);
    const userRoutes = require("./routes/userRoutes")(usersCollection);

    app.use("/api/books", bookRoutes);
    app.use("/api/users", userRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensure the client will close when you finish/error
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
