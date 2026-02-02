const express = require("express");
const notemodel = require("./models/notes.models");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

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
  const id = req.params.id;
  const { description } = req.body;
  const updatedData = await notemodel.findByIdAndUpdate(id, { description  });

  res.status(200).json({
    message: "note updated successfully ",
    updatedData
  });
});

module.exports = app;
