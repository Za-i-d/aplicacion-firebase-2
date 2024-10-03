var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsu,borrarUsuario,buscarPorId}= require("../bd/usuariosBD");


rutas.get("/usuarios",async(req, res)=>{
   var usuariosValidos=await mostrarUsuarios();
   res.json(usuariosValidos);
});

rutas.get("/usuarios/buscarPorId/:id", async(req,res)=>{
   var usuariosValido =await buscarPorId(req.params.id);
   res.json(usuariosValido);
});

rutas.delete("/usuarios/borrarUsuario/:id", async(req,res)=>{
   var usuarioBorrado=await borrarUsuario (req.params.id);
   res.json(usuarioBorrado);
});

rutas.post("/usuarios/nuevoUsuario",async (req, res)=>{
   var usuarioValido=await nuevoUsu(req.body);
   res.json(usuarioValido);
});

module.exports=rutas;