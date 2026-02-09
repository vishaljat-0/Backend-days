const mongoose= require("mongoose");


let db=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=db