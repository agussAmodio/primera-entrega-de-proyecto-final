const express = require("express");
const router = express.Router();
const baseDeDatosCarrito = require("../db_carrito");
const DB_carrito = new baseDeDatosCarrito("data");
const loggin = require("../middleware");

router.post("/", async (req, res) => {
  const { carrito } = req.body;
  const data = DB_carrito.saveCarritos({
    carrito,
  });
  res.send(data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await DB_carrito.deleteById(id);
  res.send(`carrito elminado`);
});

router.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  const data = await DB_carrito.getCarritoById(id);
  res.send(data);
});

router.post("/:id_carrito/:id_producto", async (req, res) => {
  const { id_carrito } = req.params;
  const { id_producto } = req.params;
  const data = await DB_carrito.addProducto(id_carrito, id_producto);
  res.send("producto agregado");
});

module.exports = router;
