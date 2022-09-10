import { Router } from "express";
import {
    getInitialResponse,
} from "../handshake/handshake.js";

const router = Router();

router.get("/clinishare", getInitialResponse);

export default router;
