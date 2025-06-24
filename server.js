const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (por ejemplo, index.html y estilos)
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ➕ Agregamos la ruta de autenticación
const rutaAutenticacion = require('./autenticacion');
app.use('/api', rutaAutenticacion);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en: http://localhost:${PORT}`);
});
