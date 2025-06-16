# 🚀 APIs Disponibles - NEBULA Technical Test

## 🔧 **Backend Base**
- `GET /` - Status del servidor
- `GET /ping` - Health check

## 🍃 **MongoDB APIs**
- `GET /api/data` - Obtener todos los documentos
- `POST /api/data` - Crear nuevo documento
  ```json
  { "name": "Sofia", "message": "Test message" }
  ```
- `DELETE /api/data` - Limpiar toda la colección

## 🔴 **Redis APIs**
- `GET /api/redis` - Test básico de conexión
- `POST /api/redis` - Guardar datos en Redis
  ```json
  { "key": "mykey", "value": "myvalue" }
  ```
- `GET /api/redis/:key` - Obtener valor por clave específica

## 🌐 **URLs para testing**

### **Frontend:**
- http://localhost:3000

### **Backend directo:**
- http://localhost:5000/ping
- http://localhost:5000/api/data
- http://localhost:5000/api/redis

### **Bases de datos (solo para herramientas):**
- MongoDB: localhost:27017
- Redis: localhost:6379 (usar redis-cli, no navegador)

## 🎯 **Ejemplos de uso con curl**

```bash
# Health check
curl http://localhost:5000/ping

# MongoDB - Crear datos
curl -X POST http://localhost:5000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name": "Sofia", "message": "Hola desde API"}'

# MongoDB - Leer datos
curl http://localhost:5000/api/data

# Redis - Test básico
curl http://localhost:5000/api/redis

# Redis - Guardar datos
curl -X POST http://localhost:5000/api/redis \
  -H "Content-Type: application/json" \
  -d '{"key": "prueba", "value": "funciona!"}'

# Redis - Leer clave específica
curl http://localhost:5000/api/redis/prueba
```