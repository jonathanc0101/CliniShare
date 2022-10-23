import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import  emitter  from "../eventos/eventEmitter.js";

const router = Router();

router.post("/login", () =>
  userController.loginUser().then(() => {
    emitter.emit("logged_in");
  })
);
router.post("/register", userController.registerUser);
router.put("/modify", userController.modifyUser);

export default router;
