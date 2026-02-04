const express = require("express");
const notemodel = require("./models/notes.models");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const notes = await notemodel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "success",
     notes,
  });
});
app.get("/api/notes", async (req, res) => {
  const notes = await notemodel.find();
  res.status(200).json({
    message: "success",
    data: notes,
  });
});
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await notemodel.findByIdAndDelete(id);
  res.status(200).json({
    message: "note deleted successfully ",
  });
});
app.patch("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id.trim();
     if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid note ID",
      });
    }

  const { description } = req.body;
  const updatedData = await notemodel.findByIdAndUpdate(id, { description  }, {new :true});


   if (!updatedData) {
      return res.status(404).json({ message: "Note not found" });
    } 
  res.status(200).json({
    message: "note updated successfully ",
    updatedData
  });
  } catch (error) {
    console.error("PATCH ERROR:", error);
    res.status(500).json({
      message: "Server error during update",
      error: error.message,
    });
  }
});

// app.use(stat)

module.exports = app;
