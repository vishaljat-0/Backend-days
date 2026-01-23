let express = require("express")
 let app= express();




 app.get('/',((req,res)=>{
    res.send("hello this is home page")
 }))
 app.get("/help",((req,res)=>{
    res.send("this is help  page")
 }))




 app.listen(3000)