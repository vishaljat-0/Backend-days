const express = require("express")
const notemodel = require("./models/notes.models")
const app = express()
app.use(express.json())

app.post("/notes", async (req, res) => {
    const { title, decription } = req.body
    const note = await notemodel.create({
        title, decription
    })
    res.status(201).json({
    message: 'note created successfully',
        note
    })

})
app.get("/notes", async (req,res)=>{
  const notes = await   notemodel.find()
  res.status(200).json({
    message:"notes fecthed successfully",
    notes
  })
})




module.exports = app