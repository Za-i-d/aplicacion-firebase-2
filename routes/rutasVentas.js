var rutas = require("express").Router();
var {mostrarVentas,nuevaVenta,cambiarEstatus,buscarPorIdV}= require("../bd/ventasBD");

rutas.get("/ventas", async (req, res) => {
   try {
      var ventasValidas = await mostrarVentas();
      res.json(ventasValidas);
   } catch (error) {
      console.error("Error al obtener las ventas:", error);
      res.status(500).json({ mensaje: "Ocurrió un error al mostrar las ventas" });
   }
});

rutas.get("/ventas/buscarPorId/:id", async(req, res) => {
   const ventaValido = await buscarPorIdV(req.params.id);
   res.json(ventaValido);
});

rutas.put("/ventas/cambiarEstatus/:id", async(req,res)=>{
   const idVenta = req.params.id;
   const estatusCambiado = await cambiarEstatus(idVenta, "Cancelada");
   if (estatusCambiado) {
       res.json({ mensaje: `Estado actualizado: "Cancelada"` });
   } else if (estatusCambiado === false) {
       res.status(404).json({ mensaje: "Venta no encontrada" });
   } else {
       res.status(500).json({ mensaje: "Ocurrió un error: No se puede cambiar el estado" });
   }
});

rutas.post("/ventas/nuevaVenta",async (req, res)=>{
   var ventasValidos=await nuevaVenta(req.body);
   res.json(ventasValidos);
});

module.exports=rutas;