export function calcularCobro(req,res){
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
        total: total
    });
}