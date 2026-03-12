const mongoose=  require("mongoose");
const balcklistschema= new mongoose.Schema({
    token:{
        type: String,
        required: [ true, "token is required" ],
        unique: [ true, "token must be unique" ]
    }
})


const blacklistmodel= mongoose.model("blacklist",balcklistschema);
module.exports=blacklistmodel