const mysql = require('mysql2/promise');

// Configura la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lista',
  port: 3306, // asegúrate de que sea el puerto correcto
});

module.exports = pool;