import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.put("/modify", userController.modifyUser);

export default router;
