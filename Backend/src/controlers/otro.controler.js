const submissions = [];

export function enviarOtroDatos(req, res) {
    const { nombre, correo, mensaje } = req.body;
    if (!nombre || nombre.trim() === "") {
        res.status(400).json({ error: "El nombre es requerido" });
        return;
    }
    if (!correo || correo.trim() === "") {
        res.status(400).json({ error: "El correo es requerido" });
        return;
    }
    // simple email pattern check
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(correo)) {
        res.status(400).json({ error: "El correo no tiene formato válido" });
        return;
    }
    if (!mensaje || mensaje.trim() === "") {
        res.status(400).json({ error: "El mensaje es requerido" });
        return;
    }

    const receivedAt = new Date().toISOString();
    const entry = { nombre: nombre, correo: correo, mensaje: mensaje, receivedAt };
    submissions.push(entry);
    res.json({
        status: "ok",
        receivedAt,
        data: entry
    });
}

export function getOtroDatos(req, res) {
    res.json({ count: submissions.length, items: submissions });
}
