import { Router } from "express";
import { sessionController } from "../controllers/session.controller.js";

const router = Router();

router.post("/login", sessionController.loginUser);
router.post("/register", sessionController.registerUser);

export default router;
