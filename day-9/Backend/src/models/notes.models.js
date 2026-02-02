const mongoose = require("mongoose");
const noteSchema = mongoose.Schema({
    title:String,
    description
:String
})
const models= mongoose.model("notes",noteSchema)
module.exports=models