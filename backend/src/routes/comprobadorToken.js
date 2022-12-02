import { Router } from "express";


const comprobar  = (req,res,next) =>{
    if(req.headers["token"] !== "chau"){
        console.log("noChau");
    }else{
        console.log("chau");
        next();
    }
}

export default comprobar;

