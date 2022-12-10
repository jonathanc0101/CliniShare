import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import  emitter  from "../eventos/eventEmitter.js";

const router = Router();

router.get("/validate/id/:id", userController.validateToken);
router.post("/login", async (req,res,next) =>
  {
    const loggedIn = await userController.loginUser(req,res,next);

    if(loggedIn){
      emitter.emit("logged_in");
    }

  }
  );
router.post("/register", userController.registerUser);
router.put("/modify", userController.modifyUser);
export default router;
