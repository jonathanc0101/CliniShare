import { Router } from "express";

import {getAll,resolver} from "../controllers/pacienteConflictivo.controller";

const router = Router();

router.get("/conflictos", getAll);
router.post("/conflictos/resolver", resolver);


export default router;
