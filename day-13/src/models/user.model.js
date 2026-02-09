
 const  mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email already exist"]
    },
    password:String,

})
const usermodel = mongoose.model("user",userschema)
module.exports=usermodel