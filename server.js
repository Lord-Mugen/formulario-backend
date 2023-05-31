const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// Middleware para manejar datos JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Esquema del formulario
const formularioSchema = new mongoose.Schema({
  nombre: String,
  pais: String,
});

// Modelo del formulario
const Formulario = mongoose.model("Formulario", formularioSchema);

// Ruta para guardar el formulario
app.post("/formulario", (req, res) => {
  const { nombre, pais } = req.body;

  const formulario = new Formulario({
    nombre,
    pais,
  });

  formulario
    .save()
    .then(() => {
      res.status(200).send("Formulario guardado correctamente");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error al guardar el formulario");
    });
});

// Conexión a la base de datos
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) =>
    console.error("Error al conectar a la base de datos:", error)
  );
