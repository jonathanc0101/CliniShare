import { Router } from "express";
import {
  createSincronizacion,
  getSincronizacionReciente,
} from "../controllers/sincronizaciones.controller.js";

const router = Router();

// router.get("/sincronizaciones/fechaMasReciente", getSincronizacionReciente);



export default router;
