const express = require("express")
const app = express();

app.use(express.json())

let  rules=[];
app.get("/", ((req, res) => {
    res.send("hello")
}))

app.post("/rules",((req,res)=>{
   console.log(req.body);
   rules.push(req.body)
   
}))

app.get("/About", ((req, res) => {
    res.send("hello this is about ")
   
}))
app.get("/home",((req,res)=>{
    res.send(rules)
}))


app.listen(3000,()=>{
    console.log("server is running on 3000 port ");
    
})