import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.post("/api/parqueo/calcular", (req, res) => {
    const { placa, tipo, hora, minutos } = req.body;
    if (!placa || placa.trim() === "") {
        res.status(400).json({ error: "La placa es requerida" });
        return;
    }
    if (!tipo  || (tipo !== "carro" && tipo !== "moto")) {
        res.status(400).json({ error: "El tipo de vehículo es requerido" });
        return;
    }
    if (isNaN(hora) || hora < 0) {
        res.status(400).json({ error: "La hora de entrada es requerida" });
        return;
    }
    if ( isNaN(minutos) || minutos < 0 || minutos > 59) {
        res.status(400).json({ error: "Los minutos de entrada son requeridos" });
        return;
    }

    const tarifa = tipo === "carro" ? 1200 : 500;
    let h= Number(hora);
    let m= Number(minutos);
    if(m > 5){
        h += 1;
    }

    const total = h * tarifa;
    res.json({  
        placa:placa, 
        tipo: tipo,
        tiempouso: `${h} horas y ${m} minutos`,
        horascobradas: h, 
        total: total});
});