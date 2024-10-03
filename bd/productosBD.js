const productosBD = require("./conexion").productos;
const Producto = require("../clases/ProductoClase");
const { productos } = require("./conexion");
function validarDatos(producto) {
    var valido = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        valido = true;
    }0
    return valido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    productosValidos = [];
    productos.forEach(producto => { 
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });
    return productosValidos;
}

async function buscarPorIdP(id) {
    const producto=await productosBD.doc(id).get();
    const producto1=new Producto({id:producto.id,...producto.data()});
    var productoValido;
    if (validarDatos(producto1.getProducto)) {
        productoValido=producto1.getProducto;
    }
    return productoValido;
};

async function nuevoProducto(data) {
    const producto1=new Producto(data);
    var productoValido=false;
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        productoValido=true;
    }
   return productoValido;
};

async function borrarProducto(id) {
    var productoValido=await buscarPorIdP(id);
    var productoBorrado=false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado=true;
    }
    return productoBorrado;
}

module.exports={
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorIdP
}
