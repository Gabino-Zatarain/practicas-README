const express = require('express');
const app = express();

// Ruta principal
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// NUEVA RUTA: Endpoint /usuario
app.get('/usuario', (req, res) => {
  // Objeto hardcodeado (puedes poner tus datos)
  const usuario = {
    id: 101,
    nombre: 'Gabino Alonso',
    rol: 'Desarrollador Backend'
  };

  // Enviamos el objeto como JSON
  res.json(usuario);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});