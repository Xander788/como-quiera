import { Router } from "express";
import { calcularCobro } from "../controlers/parqueo.controler.js";

const router = Router();
router.post("/calcular", calcularCobro);

export default router;