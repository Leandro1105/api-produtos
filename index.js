require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const server = express();

const productRoutes = require("./routes/productRoutes");

server.use(
  express.urlencoded({
    extended: true,
  })
);

server.use(express.json());

server.use("/produto", productRoutes);

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_PARAMS = process.env.DB_PARAMS;

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/?${DB_PARAMS}`;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Conectado ao MONGO DB!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB", err);
  });

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
