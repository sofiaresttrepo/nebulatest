const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Redis = require('ioredis');
const redis = new Redis({ host: 'redis', port: 6379 });


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/testdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/redis', async (req, res) => {
  try {
    await redis.set('saludo', '¡Hola desde Redis!');
    const mensaje = await redis.get('saludo');
    res.send(mensaje);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error con Redis');
  }
});
