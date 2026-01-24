const express = require("express")
const app = express()

let notes=[]
app.use(express.json())
app.get("/",((req,res)=>{
    res.send("hello")
}))


app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)

})
app.get("/notes",((req,res)=>{
    res.send(notes)
}))
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]
    console.log(req.params.index)
    res.send("deleted sucessfully ")    
})
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description
    res.send("note updated")

})
module.exports=app