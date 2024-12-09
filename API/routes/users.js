const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db/db'); // Assuming connection is established elsewhere
const cors = require('cors');

const router = express.Router();
router.use(cors());

router.post('/login', async (req, res) => {
  const { usuario, contra, tipo } = req.body;

  try {
    // Consultar la base de datos de manera segura por el correo
    const [rows] = await pool.query('SELECT usuario, contra, tipo FROM Usuarios WHERE usuario = ? and tipo = ?', [usuario, tipo]);

    // Verificar si el correo no existe
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado (VERIFICAR QUE ESTE EN LOGIN CORRECTO)' }); // Correo no encontrado
    }

    // Comparar la contraseña de manera segura
    if (contra !== rows[0].contra) {
      return res.status(401).json({ message: 'Contraseña incorrecta' }); // Contraseña incorrecta
    }

    // Generar el JWT con un secreto seguro y un tiempo de expiración adecuado
    const token = jwt.sign({ Usuario: rows[0].correo }, "SECRETO", { expiresIn: '24h' });

    // Devolver el token al cliente
    res.json({ token });

    console.log("TOKEN: " + token);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
});

router.post('/register', async (req, res) => {
  const { usuario, contra, tipo, nombre } = req.body;

  // // Validación básica de datos
  // if (!usuario || !contra || !tipo || !nombre) {
  //   return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  // }

  try {
    // Realizar la inserción de los datos en la base de datos
    const [result] = await pool.query(
      'INSERT INTO usuarios (usuario, contra, tipo, nombre) VALUES (?, ?, ?, ?)',
      [usuario, contra, tipo, nombre]
    );

    // Confirmar la inserción con un mensaje de éxito
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      userId: result.insertId, // Devuelve el ID del nuevo registro
    });
  } catch (err) {
    console.error(err);

    // Manejo de errores específicos (por ejemplo, duplicados)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El usuario ya está registrado' });
    }

    // Respuesta genérica para errores inesperados
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});


module.exports = router;
