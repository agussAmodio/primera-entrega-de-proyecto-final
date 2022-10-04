const express = require("express");
const app = express();
const loggin = require("./middleware.js");
const { send } = require("process");
const baseDeDatos = require("./db.js");
const DB = new baseDeDatos("data");
const baseDeDatosCarrito = require("./db_carrito");
const DB_carrito = new baseDeDatosCarrito("data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./router/RutasProductos"));
app.use("/api/carrito", require("./router/RutasCarritos"));

app.listen(8080, () => {
  console.log("Servidor iniciado");
});
