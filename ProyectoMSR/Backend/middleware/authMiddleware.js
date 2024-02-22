import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js";

const checkAuth=async(req,res,next)=>{
    let token;
    //console.log("Desde mi middleware");
    //console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //console.log(req.headers.authorization)
            token=req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded);
            //const *usuario= await Usuario.findById(decoded.id).select("-password -token -confirmado");
            req.usuario= await Usuario.findById(decoded.id).select("-password -token -confirmado");
            //console.log(usuario);
            return next();
        } catch (error) {
            const e = new Error("Token no Valido ");
            return res.status(403).json({msg:e.message});
        }
        //console.log('Si tiene el token con bearer ');
    }
   // else{ console.log('No no hay token o bearer ')   }

   if(!token){
    const error = new Error("Forma de Token no Valido o inexistente");
    res.status(403).json({msg:error.message});
   }
   next();
};

export default checkAuth