import { userService } from "../services/user.service.js";

export const comprobarTest = (req, res, next) => {
  if (req.headers["token"] !== "chau") {
    console.log("noChau");
    res.status(401).json({ error: "Unauthorized" });
  } else {
    console.log("chau");
    next();
  }
};

const comprobarToken = async (req, res, next) => {
  const token = req.headers["token"];
  const verificado = await userService.comprobarToken(token);

  if (verificado) {
      next();

} else {
    res.status(401).json({ error: "Unauthorized: Token inválido ;^)" });
  }
};

export default comprobarToken;
