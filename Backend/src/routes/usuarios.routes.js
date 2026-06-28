import { Router } from "express";
import {
  agregarUsuario,
  obtenerTodosUsuarios,
  obtenerUsuarioPorId,
  modificarUsuario,
  eliminarUsuario,
} from "../controlers/usuarios.controler.js";

const router = Router();

router.post("/", agregarUsuario);
router.get("/", obtenerTodosUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.patch("/:id", modificarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
