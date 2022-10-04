const express = require("express");
const app = express();

// * Middleware - si admin es true se va a poder entrar. De lo contrario tirara error.

const admin = false;
const protegida = (req, res, next) => {
  if (admin) {
    next();
  } else {
    res.status(403).send({ error: -1, descripcion: `ruta no autorizada` });
  }
};

module.exports = protegida;
