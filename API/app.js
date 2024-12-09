const express = require('express');
const usersRouter = require('./routes/users');
const productosRouter = require('./routes/productos')
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3005; // Use environment variable for port

app.use(express.json());
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3001' // Reemplaza con el origen de tu aplicación React
}));

app.get('/', (req, res) => {
  res.send('Hola 1  Mundo desde mi primera API en Node.js!');
});

app.use('/users', usersRouter);
app.use('/productos', productosRouter);

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});