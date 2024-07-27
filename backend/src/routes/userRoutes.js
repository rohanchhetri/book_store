const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (usersCollection) => {
  // GET all users
  router.get("/", async (req, res) => {
    try {
      const users = await usersCollection.find().toArray();
      res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // GET user by ID
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      res.send(user);
    } catch (err) {
      console.error("Error fetching user:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // Check if username or email already exists
  router.get("/users/check/:username/:email", async (req, res) => {
    try {
      const { username, email } = req.params;
      const user = await usersCollection.findOne({
        $or: [{ username }, { email }],
      });
      if (user) {
        return res.send(true);
      }
      return res.send(false);
    } catch (err) {
      console.error("Error checking user existence:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  // POST create a new user
  router.post("/", async (req, res) => {
    try {
      const newUser = req.body;

      // Check if a user with the same email or username already exists
      const existingUser = await usersCollection.findOne({
        $or: [{ email: newUser.email }, { username: newUser.username }],
      });

      if (existingUser) {
        if (existingUser.email === newUser.email) {
          return res
            .status(400)
            .send("User with the same email already exists");
        }
        if (existingUser.username === newUser.username) {
          return res
            .status(400)
            .send("User with the same username already exists");
        }
      }

      // If no user with the same email or username exists, insert the new user
      const result = await usersCollection.insertOne(newUser);
      res.status(201).send(result);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // PUT update user by ID
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedUser,
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      if (result.matchedCount === 0) {
        res.status(404).send("User not found");
        return;
      }
      res.send("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // DELETE user by ID
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        res.status(404).send("User not found");
        return;
      }
      res.json(result);
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
