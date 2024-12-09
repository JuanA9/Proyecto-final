const express = require('express');
const pool = require('../db/db'); // Assuming connection is established elsewhere
const cors = require('cors');

const router = express.Router();
router.use(cors());

router.get('/todos', async (req, res) => {
   try {
      // Define tu consulta SQL
      const query = 'SELECT IdProducto, nombre,descripcion,precio FROM productos';

      // Ejecuta la consulta
      const [rows] = await pool.query(query);

      // Responde con los datos
      res.json(rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la solicitud desde productos' });
   }
});

router.get('/descuentos', async (req, res) => {
   try {
      // Define tu consulta SQL
      const query = 'SELECT IdProducto, nombre,descripcion,precio FROM productos where idsubcategoria = 8';

      // Ejecuta la consulta
      const [rows] = await pool.query(query);

      // Responde con los datos
      res.json(rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la solicitud desde productos' });
   }
});

router.get('/men', async (req, res) => {
   try {
      // Define tu consulta SQL
      const query = 'SELECT * FROM productos p inner join subcategorias sc on p.IdSubcategoria = sc.IdSubcategoria inner join categorias c on c.IdCategoria = sc.IdCategoria where c.IdCategoria = 1';

      // Ejecuta la consulta
      const [rows] = await pool.query(query);

      // Responde con los datos
      res.json(rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la solicitud desde productos' });
   }
});

router.get('/woman', async (req, res) => {
   try {
      // Define tu consulta SQL
      const query = 'SELECT * FROM productos p inner join subcategorias sc on p.IdSubcategoria = sc.IdSubcategoria inner join categorias c on c.IdCategoria = sc.IdCategoria where c.IdCategoria = 2';

      // Ejecuta la consulta
      const [rows] = await pool.query(query);

      // Responde con los datos
      res.json(rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la solicitud desde productos' });
   }
});

router.get('/kids', async (req, res) => {
   try {
      // Define tu consulta SQL
      const query = 'SELECT * FROM productos p inner join subcategorias sc on p.IdSubcategoria = sc.IdSubcategoria inner join categorias c on c.IdCategoria = sc.IdCategoria where c.IdCategoria = 3';

      // Ejecuta la consulta
      const [rows] = await pool.query(query);

      // Responde con los datos
      res.json(rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la solicitud desde productos' });
   }
});

router.get('/nuevos', async (req, res) => {
   try {
      // Define tu consulta SQL
      const query = 'SELECT IdProducto, nombre,descripcion,precio FROM productos WHERE Fecha_Anadido >= CURDATE() - INTERVAL 15 DAY;';

      // Ejecuta la consulta
      const [rows] = await pool.query(query);

      // Responde con los datos
      res.json(rows);
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la solicitud desde productos' });
   }
});


module.exports = router;
