const mongoose = require("mongoose");
const postschema = new mongoose.Schema({
    caption: {
        type: String,
        default:"this is camption at default"
    },
   
    imageUrl: {
        type: String,
        required: [true, "image is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user is required"],
    }
})

const postmodel= mongoose.model("posts",postschema)
module.exports=postmodel