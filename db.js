const fs = require("fs");

class baseDeDatos {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async obtenerProductosDesdeDb() {
    const data = await fs.promises.readFile(
      `${this.archivo}/productos.json`,
      "utf-8"
    ); // Lee el archivo productos.json y lo guarda como string en la variable data
    let productos = JSON.parse(data); // transforma (parsea) la variable data de string a tipo array de objeto (de tipo producto) y lo almacena en la variable productos
    return productos; // retorna el array de productos
  }

  async guardarProductosEnDb(productos) {
    const productosString = JSON.stringify(productos);
    await fs.promises.writeFile(
      `${this.archivo}/productos.json`,
      productosString
    );
  }

  async actualizarProductosDeDb() {}

  // guarda el producto nuevo y le asigna un id y su timestamp
  async save(productoParaGuardar) {
    let productos;

    try {
      productos = await this.obtenerProductosDesdeDb();
    } catch (error) {
      productos = [];
    }

    let id;

    if (productos.length === 0) {
      id = 1;
      productoParaGuardar.id = id;
      let fecha = new Date();
      let fechaYhora = fecha.toLocaleString();
      productoParaGuardar.timestamp = fechaYhora;
    } else {
      let ultimoProducto = productos[productos.length - 1];
      let idActual = ultimoProducto.id;
      id = idActual + 1;
      productoParaGuardar.id = id;
      let fecha = new Date();
      let fechaYhora = fecha.toLocaleString();
      productoParaGuardar.timestamp = fechaYhora;
    }

    productos.push(productoParaGuardar);

    this.guardarProductosEnDb(productos);
  }

  //Buscar un producto por id

  async getById(idBuscar) {
    const productos = await this.obtenerProductosDesdeDb();
    const productoEncontrado = productos.findIndex(
      (producto) => producto.id == idBuscar
    );

    if (productoEncontrado !== -1) {
      return productos[productoEncontrado];
    } else {
      return "producto no encontrado";
    }
  }

  //Borra un producto por id

  async deleteById(idBorrar) {
    const productos = await this.obtenerProductosDesdeDb();
    const indiceDeProductoABorrar = productos.findIndex(
      (producto) => producto.id == idBorrar
    );

    if (indiceDeProductoABorrar !== -1) {
      productos.splice(indiceDeProductoABorrar, 1);
      this.guardarProductosEnDb(productos);
    } else {
      console.log("Id no encontrado");
    }
  }

  async getAll() {
    let productos = await this.obtenerProductosDesdeDb();
    return productos;
  }

  //Actualiza un producto
  async putById(idActualizar, productoActualizado) {
    const productos = await this.obtenerProductosDesdeDb();
    let indiceDeProductoActualizar = productos.findIndex(
      (producto) => producto.id == idActualizar
    );
    console.log(indiceDeProductoActualizar);
    if (indiceDeProductoActualizar !== -1) {
      productos[indiceDeProductoActualizar] = productoActualizado;
      await this.guardarProductosEnDb(productos);
    } else {
      console.log("producto no encontrado");
    }
  }
  // Buscar el indice del producto a borrar
  async indexProductoABorrar(idProducto) {
    const productos = await this.obtenerProductosDesdeDb();
    const indexABorrar = productos.findIndex(
      (producto) => producto.id == idProducto
    );
    if (indexABorrar !== -1) {
      return indexABorrar;
    } else {
      console.log("producto no encontrado");
    }
  }
}

module.exports = baseDeDatos;
