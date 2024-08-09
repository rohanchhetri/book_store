const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (messagesCollection) => {
  // GET all messages
  router.get("/", async (req, res) => {
    try {
      const messages = await messagesCollection.find().toArray();
      res.json(messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // GET message by ID
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const message = await messagesCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!message) {
        res.status(404).send("Message not found");
        return;
      }
      res.send(message);
    } catch (err) {
      console.error("Error fetching message:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // POST create a new message
  router.post("/", async (req, res) => {
    try {
      const newMessage = req.body;

      // Insert the new message into the collection
      const result = await messagesCollection.insertOne(newMessage);
      res.status(201).send(result);
    } catch (err) {
      console.error("Error creating message:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // PUT update message by ID
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const updatedMessage = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedMessage,
      };

      const result = await messagesCollection.updateOne(filter, updateDoc);
      if (result.matchedCount === 0) {
        res.status(404).send("Message not found");
        return;
      }
      res.send("Message updated successfully");
    } catch (err) {
      console.error("Error updating message:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  // DELETE message by ID
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await messagesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount === 0) {
        res.status(404).send("Message not found");
        return;
      }
      res.json(result);
    } catch (err) {
      console.error("Error deleting message:", err);
      res.status(500).send("Internal Server Error");
    }
  });

  return router;
};
