const express = require('express')
const cat= require("random-cat-img")


const app= express()
app.get("/", (req, res) => {
  res.send(`
    <h1>Random Cat 🐱</h1>
    <img src="${cat()}" width="300" />
  `);
});

app.listen(3000,()=>{
    console.log("Hello server is runnig");
 
   
    
    
})