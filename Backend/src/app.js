import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import parqueoRoutes from "./routes/parqueo.routes.js";
dotenv.config();

const app = express();
const NAME = process.env.SERVER_NAME;
const VERSION = process.env.SERVER_VERSION;
const DESCRIPTION = process.env.SERVER_DESCRIPTION;
const PORT = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({ 
        name: NAME, 
        version: VERSION, 
        description: DESCRIPTION,
        puerto: PORT
    });
});

app.listen(PORT,()=>{
    console.log(`${NAME} - ${VERSION} running on http://localhost:${PORT}`);
});



app.use("/api/parqueo", parqueoRoutes);