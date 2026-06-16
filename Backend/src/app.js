import express from "express";
const app = express();


app.get("/",(req,res)=>{
    res.send('<h1>hello world</h1>');
});

app.listen(4000,()=>{
    console.log("servidor en puerto http://localhost:4000");
});