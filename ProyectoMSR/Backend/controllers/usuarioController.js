import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar=async (req,res)=>{
/*   console.log(req.body);
    const {email,password,nombre}=req.body;
console.log(email);
console.log(password);
console.log(nombre);
*/
const {rpe}=req.body;
const existeUsuario = await Usuario.findOne({rpe:rpe});
if(existeUsuario){

    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message});
}

try{
    const usuario=new Usuario(req.body)
    const usuarioGuardado= await usuario.save();
    res.json(usuarioGuardado);
}
catch{
    console.log(error)
}
}

const perfil=(req,res)=>{
    //console.log("entramos perfil")
    //console.log(req.usuario);
    const {usuario}=req
   // res.json({msg:"Mostrando perfil"});
   res.json({perfil:usuario})
}

const confirmar= async(req,res)=>{
   // console.log(req.params.token)
   const {token}=req.params
   const usuarioConfirmar = await Usuario.findOne({token:token});
    console.log(usuarioConfirmar);

    if(!usuarioConfirmar){
        const error = new Error('Token no valido')
        console.log('Token no valido')
        return res.status(404).json({msg: error.message})
    }
    
   try {
    usuarioConfirmar.token=null;
    usuarioConfirmar.confirmado=true
    await usuarioConfirmar.save()
    res.json({msg:"Usuario Confirmado Correctamente"})
    
   } catch (error) {
    console.log(error)
   }
}

const autenticar =async (req,res)=>{
    //console.log(req.body);
    const {email,password}= req.body;
    const usuario = await Usuario.findOne({email:email})
    if(!usuario){
        const error = new Error('el usuario no existe')
        return res.status(403).json({msg: error.message})
    }

    if(!usuario.confirmado){
        const error = new Error('tu cuenta no ha sido confirmada')
        return res.status(403).json({msg: error.message})
    }


    if(await usuario.comprobarPassword(password)){
        console.log('password correcto')
        res.json({token:generarJWT(usuario.id)})
    }else{
        const error = new Error('El password es incorrecto')
        return res.status(403).json({msg: error.message})
    }


}

const olvidePassword=(req,res)=>{

}
const comprobarToken=(req,res)=>{   

}
const nuevoPassword=(req,res)=>{

}


export {registrar,perfil,confirmar,autenticar,olvidePassword,comprobarToken,nuevoPassword}