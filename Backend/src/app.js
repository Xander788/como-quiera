import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const NAME = process.env.SERVER_NAME;
const VERSION = process.env.SERVER_VERSION;
const DESCRIPTION = process.env.SERVER_DESCRIPTION;
const PORT = process.env.SERVER_PORT;

app.get("/",(req,res)=>{
    res.send(`<h1>${NAME} - ${VERSION}</h1><p>${DESCRIPTION}</p>`);
});

app.listen(PORT,()=>{
    console.log(`${NAME} - ${VERSION} running on http://localhost:${PORT}`);
});