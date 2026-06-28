import bcrypt from "bcrypt";
import pool from "../../config/db.js";
export async function agregarUsuario(req, res) {
  try {
    const { nombre, correo, contrasena, confirmacion } = req.body;

    if (!nombre || nombre.trim() === "") {
      res.status(400).json({ error: "El nombre es requerido" });
      return;
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correo || !regexCorreo.test(correo)) {
      res.status(400).json({
        error: "El correo debe cumplir con el formato de correo electrónico",
      });
      return;
    }

    if (!contrasena) {
      res.status(400).json({ error: "La contraseña es requerida" });
      return;
    }

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexContrasena.test(contrasena)) {
      res.status(400).json({
        error:
          "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas y números",
      });
      return;
    }

    if (contrasena !== confirmacion) {
      res
        .status(400)
        .json({ error: "La contraseña y la confirmación no coinciden" });
      return;
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.execute(
      `INSERT INTO usuarios
      (nombre, correo, contrasena)
      VALUES (?, ?, ?)`,
      [nombre, correo, hashedPassword],
    );

    res.json({
      id: result.insertId,
      nombre: nombre,
      correo: correo,
      mensaje: "Usuario agregado exitosamente",
    });
  } catch (error) {
    console.error("Error al agregar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function obtenerTodosUsuarios(req, res) {
  try {
    const [usuarios] = await pool.execute(
      "SELECT id, nombre, correo FROM usuarios",
    );

    if (usuarios.length === 0) {
      res.status(404).json({ mensaje: "No hay usuarios registrados" });
      return;
    }

    res.json({
      total: usuarios.length,
      usuarios: usuarios,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function obtenerUsuarioPorId(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const [usuarios] = await pool.execute(
      "SELECT id, nombre, correo FROM usuarios WHERE id = ?",
      [id],
    );

    if (usuarios.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json(usuarios[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function modificarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { contrasena, confirmacion } = req.body;

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    if (!contrasena) {
      res.status(400).json({ error: "La contraseña es requerida" });
      return;
    }

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regexContrasena.test(contrasena)) {
      res.status(400).json({
        error:
          "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas y números",
      });
      return;
    }

    if (contrasena !== confirmacion) {
      res
        .status(400)
        .json({ error: "La contraseña y la confirmación no coinciden" });
      return;
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.execute(
      "UPDATE usuarios SET contrasena = ? WHERE id = ?",
      [hashedPassword, id],
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json({
      id: id,
      mensaje: "Contraseña modificada exitosamente",
    });
  } catch (error) {
    console.error("Error al modificar contraseña:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      res.status(400).json({ error: "ID inválido" });
      return;
    }

    const [result] = await pool.execute("DELETE FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    res.json({
      id: id,
      mensaje: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
