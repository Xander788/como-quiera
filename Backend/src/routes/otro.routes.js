import { Router } from "express";
import { enviarOtroDatos, getOtroDatos } from "../controlers/otro.controler.js";

const router = Router();
router.post("/enviar", enviarOtroDatos);
router.get("/", getOtroDatos);

export default router;
