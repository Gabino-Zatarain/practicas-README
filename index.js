const express = require('express');
const pool = require('./db'); // Importamos la conexión nueva
const app = express();

// --- Ruta de la actividad anterior ---
app.get('/usuario', (req, res) => {
  const usuario = {
    id: 101,
    nombre: 'Gabino Alonso',
    rol: 'Desarrollador Backend'
  };
  res.json(usuario);
});

// --- Configuración de la nueva actividad ---
app.get('/', (req, res) => {
  res.send('API funcionando y conectada');
});

// Prueba de conexión a PostgreSQL
pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err) => {
    console.error('Error de conexión', err);
  });

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});