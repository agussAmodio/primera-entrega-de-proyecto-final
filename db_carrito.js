const fs = require("fs");
const baseDeDatos = require("./db.js");
const DB = new baseDeDatos("data");

class baseDeDatosCarrito {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async obtenerCarritosDesdeDb() {
    const data = await fs.promises.readFile(
      `${this.archivo}/carritos.json`,
      "utf-8"
    ); //
    let carritos = JSON.parse(data);
    return carritos;
  }

  async guardarCarritosEnDb(carritos) {
    const carritosString = JSON.stringify(carritos);
    await fs.promises.writeFile(
      `${this.archivo}/carritos.json`,
      carritosString
    );
  }

  // GUARDA EL CARRITO Y LE ASIGNA UN ID Y UN TIMESTAMP
  async saveCarritos(carritoParaGuardar) {
    let carritos;

    try {
      carritos = await this.obtenerCarritosDesdeDb();
    } catch (error) {
      carritos = [];
    }

    let id;
    let productos = [];

    if (carritos.length === 0) {
      id = 1;
      carritoParaGuardar.id = id;
      let fecha = new Date();
      let fechaYhora = fecha.toLocaleString();
      carritoParaGuardar.timestamp = fechaYhora;
      carritoParaGuardar.productos = productos;
      carritos.push(carritoParaGuardar);
      this.guardarCarritosEnDb(carritos);
      return id;
    } else {
      let ultimoCarrito = carritos[carritos.length - 1];
      let idActual = ultimoCarrito.id;
      id = idActual + 1;
      carritoParaGuardar.id = id;
      let fecha = new Date();
      let fechaYhora = fecha.toLocaleString();
      carritoParaGuardar.timestamp = fechaYhora;
      carritoParaGuardar.productos = productos;
      carritos.push(carritoParaGuardar);
      this.guardarCarritosEnDb(carritos);
      return id;
    }
  }

  async deleteById(idBorrar) {
    const carritos = await this.obtenerCarritosDesdeDb();
    const indiceDeCarritoABorrar = carritos.findIndex(
      (carrito) => carrito.id == idBorrar
    );

    if (indiceDeCarritoABorrar !== -1) {
      carritos.splice(indiceDeCarritoABorrar, 1);
      this.guardarCarritosEnDb(carritos);
    } else {
      console.log("Id no encontrado");
    }
  }

  async getCarritoById(idCarrito) {
    const carritos = await this.obtenerCarritosDesdeDb();
    const indiceDeCarritoListar = carritos.findIndex(
      (carrito) => carrito.id == idCarrito
    );

    if (indiceDeCarritoListar !== -1) {
      return carritos[indiceDeCarritoListar].productos;
    } else {
      return "Carrito non encontrado";
    }
  }

  async getCarrito(idCarrito) {
    const carritos = await this.obtenerCarritosDesdeDb();
    const indiceDeCarritoListar = carritos.findIndex(
      (carrito) => carrito.id == idCarrito
    );

    if (indiceDeCarritoListar !== -1) {
      return carritos[indiceDeCarritoListar];
    } else {
      return "Carrito non encontrado";
    }
  }

  async buscarIndexCarrito(idCarrito) {
    const carritos = await this.obtenerCarritosDesdeDb();
    const indexABuscar = carritos.findIndex(
      (carrito) => carrito.id == idCarrito
    );
    if (indexABuscar !== -1) {
      return indexABuscar;
    } else {
      return "Carrito non encontrado";
    }
  }
  async addProducto(id_carrito, id_producto) {
    const IndexCarrito = await this.buscarIndexCarrito(id_carrito);
    const buscarProducto = await DB.getById(id_producto);
    const carritos = await this.obtenerCarritosDesdeDb();
    carritos[IndexCarrito].productos.push(buscarProducto);
    this.guardarCarritosEnDb(carritos);
  }

  async deleteProductoById(id_carrito, id_producto) {
    const IndexCarrito = await this.buscarIndexCarrito(id_carrito);
    const indexProducto = await DB.indexProductoABorrar(id_producto);
    const carritos = await this.obtenerCarritosDesdeDb();

    const indexCarritoABuscar = carritos.findIndex(
      (carrito) => carrito.id == id_carrito
    );
    const carritoActual = carritos[indexCarritoABuscar];
    const indexProductoABorrar = carritoActual.productos.findIndex(
      (producto) => producto.id == id_producto
    );

    if (indexProductoABorrar !== -1) {
      carritos[indexCarritoABuscar].productos.splice(indexProductoABorrar, 1);
      this.guardarCarritosEnDb(carritos);
    } else {
      console.log("Id no encontrado");

      console.log(indexCarritoABuscar);
      console.log(carritos[indexCarritoABuscar]);
      console.log(indexProductoABorrar);
    }
  }
}

module.exports = baseDeDatosCarrito;
