
import { userService } from "../services/user.service.js";

export const userController = {
    registerUser,
    loginUser,
    modifyUser,
}

async function registerUser (req, res, next) {
    const credentials = req.body;
    const response = await userService.register(credentials);

    res.send(JSON.stringify(response));
  };
  
async function loginUser  (req, res, next) {
    const datosLogin = req.body;

    const response = await userService.login(datosLogin.email, datosLogin.password);
  
    res.send(JSON.stringify(response));

    if(response.token){
      return true
    }else{
      return false
    }
  };
  

    
async function modifyUser  (req, res, next) {
  const user = req.body;
  const response = await userService.modify(user);

  res.send(JSON.stringify(response));
};