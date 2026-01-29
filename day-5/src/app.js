const express=require("express")
const app = express();
app.use(express.json())
const  notes=[]

app.post("/notes",(req,res)=>{
    // console.log(req.body);
    notes.push(req.body)
        console.log(notes);

    
})

app.get("/notes",(req,res)=>{
    res.send(notes)
    console.log(notes);
    
    

})

module.exports=app;