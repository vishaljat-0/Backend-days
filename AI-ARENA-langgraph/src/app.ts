import express from 'express';

const app = express();

app.get("/vishal",(req,res)=>{
    res.status(200).send("hello vishal")
})
export default app