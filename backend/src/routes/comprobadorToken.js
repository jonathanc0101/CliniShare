const comprobar  = (req,res,next) =>{
    if(req.headers["token"] !== "chau"){
        console.log("noChau");
        res.status(401).json({ error: 'Unauthorized' });
        
    }else{
        console.log("chau");
        next();
    }
}

export default comprobar;

