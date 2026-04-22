const express = require('express');
const pool = require('./db');
const app = express();

// ESTA LÍNEA ES EL "TRADUCTOR". 
// Sin ella, el servidor no entiende el JSON que viene de Postman.
app.use(express.json());

// --- Ruta GET (La que ya tenías) ---
app.get('/alumnos', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar alumnos:', error);
    res.status(500).json({ error: 'Error al obtener los alumnos' });
  }
});

// --- NUEVA Ruta POST (Para insertar) ---
app.post('/alumnos', async (req, res) => {
  try {
    // Sacamos los datos que nos llegan desde Postman
    const { nombre, apellido, edad, correo } = req.body;

    // Validación: Comprobar que no falte nada
    if (!nombre || !apellido || !edad || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Insertar en la base de datos
    const resultado = await pool.query(
      'INSERT INTO alumno (nombre, apellido, edad, correo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, correo]
    );

    res.status(201).json({
      mensaje: 'Alumno insertado correctamente',
      alumno: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al insertar alumno:', error);
    res.status(500).json({ error: 'Error al insertar el alumno' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});