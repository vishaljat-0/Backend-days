const app= require("./src/app")
const connecteddb=require("./src/config/db")
require("dotenv").config()
// 4bgZtXlU3VIdcrtg
// vishal




connecteddb()
app.listen(3000,()=>{
    console.log("server is running ");
    
})