const mongoose= require("mongoose")

let connecteddb=()=>{
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("database is connected ");
    
})

}
module.exports=connecteddb