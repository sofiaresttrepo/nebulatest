const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Redis = require('ioredis');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de Redis con manejo de errores
const redis = new Redis({ 
  host: 'redis', 
  port: 6379,
  retryDelayOnFailover: 100,
  lazyConnect: true
});

redis.on('connect', () => console.log('✅ Connected to Redis'));
redis.on('error', (err) => console.log('❌ Redis error:', err.message));

// Conexión a MongoDB
mongoose.connect('mongodb://mongo:27017/testdb')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Esquema simple para MongoDB
const TestSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const TestModel = mongoose.model('Test', TestSchema);

// ================================
// ENDPOINTS BÁSICOS
// ================================

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello from backend!',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de ping para verificar conectividad
app.get('/ping', (req, res) => {
  res.json({ 
    message: 'pong', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// ================================
// ENDPOINTS DE MONGODB
// ================================

// GET: Obtener todos los documentos
app.get('/api/data', async (req, res) => {
  try {
    const data = await TestModel.find().sort({ timestamp: -1 });
    res.json({ 
      success: true, 
      count: data.length,
      data: data 
    });
  } catch (err) {
    console.error('Error getting data:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error retrieving data from MongoDB' 
    });
  }
});

// POST: Crear nuevo documento
app.post('/api/data', async (req, res) => {
  try {
    const { name, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and message are required' 
      });
    }

    const newData = new TestModel({ name, message });
    const savedData = await newData.save();
    
    res.status(201).json({ 
      success: true, 
      data: savedData 
    });
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error saving data to MongoDB' 
    });
  }
});

// DELETE: Limpiar toda la colección (útil para testing)
app.delete('/api/data', async (req, res) => {
  try {
    const result = await TestModel.deleteMany({});
    res.json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} documents` 
    });
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error deleting data from MongoDB' 
    });
  }
});

// ================================
// ENDPOINTS DE REDIS
// ================================

// GET: Leer desde Redis
app.get('/api/redis', async (req, res) => {
  try {
    await redis.set('saludo', '¡Hola desde Redis!');
    const mensaje = await redis.get('saludo');
    
    res.json({ 
      success: true, 
      message: mensaje,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error connecting to Redis' 
    });
  }
});

// POST: Escribir a Redis
app.post('/api/redis', async (req, res) => {
  try {
    const { key, value } = req.body;
    
    if (!key || !value) {
      return res.status(400).json({ 
        success: false, 
        error: 'Key and value are required' 
      });
    }

    await redis.set(key, value);
    const storedValue = await redis.get(key);
    
    res.json({ 
      success: true, 
      key: key,
      value: storedValue,
      message: 'Data stored in Redis successfully'
    });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error storing data in Redis' 
    });
  }
});

// GET: Obtener clave específica de Redis
app.get('/api/redis/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redis.get(key);
    
    if (value === null) {
      return res.status(404).json({ 
        success: false, 
        message: `Key '${key}' not found in Redis` 
      });
    }
    
    res.json({ 
      success: true, 
      key: key,
      value: value 
    });
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).json({ 
      success: false, 
      error: 'Error retrieving data from Redis' 
    });
  }
});

// ================================
// SERVER
// ================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/ping`);
});