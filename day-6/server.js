const app = require("./src/app")
const mongoose = require("mongoose")

let conncettodb=()=>{
    mongoose.connect("mongodb+srv://vishujat08_db_user:b7c6vtqTNbyzaiQZ@cluster0.uv0ig3z.mongodb.net/day-6")
    .then(()=>{
        console.log("database is connected");
        
    })

}
conncettodb()

app.listen(3000,()=>{
    console.log("server is running ");
    
})  