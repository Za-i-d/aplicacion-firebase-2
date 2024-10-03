var rutas = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorIdP}= require("../bd/productosBD");

rutas.get("/productos",async(req, res)=>{
   var productosValidos=await mostrarProductos();
   res.json(productosValidos);
});

rutas.get("/productos/buscarPorId/:id", async(req,res)=>{
   var productosValido =await buscarPorIdP(req.params.id);
   res.json(productosValido);
});

rutas.delete("/productos/borrarProducto/:id", async(req,res)=>{
   var productoBorrado=await borrarProducto (req.params.id);
   res.json(productoBorrado);
});

rutas.post("/productos/nuevoProducto",async (req, res)=>{
   var productoValido=await nuevoProducto(req.body);
   res.json(productoValido);
});


module.exports=rutas;