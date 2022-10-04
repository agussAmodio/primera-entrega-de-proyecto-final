const express = require("express");
const router = express.Router();
const baseDeDatos = require("../db");
const DB = new baseDeDatos("data");
const protegida = require("../middleware");

router.get("/", async (req, res) => {
  const data = await DB.getAll();
  res.send(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await DB.getById(id);
  res.send(data);
});

router.post("/", protegida, async (req, res) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const data = await DB.save({
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  });
  res.send("producto añadido");
});

router.put("/:id", protegida, async (req, res) => {
  const { id } = req.params;
  let productoActualizado = req.body;
  const data = await DB.putById(id, productoActualizado);
  res.end(data);
});

router.delete("/:id", protegida, async (req, res) => {
  const idBorrar = req.params.id;
  const data = await DB.deleteById(idBorrar);
  res.send(`producto elminado`);
});

module.exports = router;
