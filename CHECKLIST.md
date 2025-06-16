# ✅ Checklist Prueba Técnica Fullstack + DevOps – NEBULA ENGINEERING

## 🧱 FASE 1: Preparación Previa

### 🖥️ Entorno de Desarrollo

- [ ✅] Crear estructura de proyecto en **VS Code** con tres carpetas:
  - [ ✅] `/frontend` (React con CRA)
  - [ ✅] `/backend` (Node.js + Express)
  - [ ✅] `/mongo` (configurada vía Docker)

- [✅ ] Crear archivo `docker-compose.yml` en la raíz del proyecto

- [ ✅] Incluir y configurar servicios:
  - [✅ ] **Frontend** (React)
  - [✅ ] **Backend** (Node.js)
  - [✅ ] **MongoDB**

- [✅ ] Verificar que los servicios se ejecutan correctamente con:
  ```bash
  docker-compose up --build
  ```

- [ ✅] Asegurarse que cada servicio se exponga por su puerto:
  - [ ✅] React → `http://localhost:3000`
  - [✅ ] Backend → `http://localhost:5000`
  - [ ✅] MongoDB → `27017` interno (no expuesto si no es necesario)

### ⚙️ Docker Compose

- [ ✅] Uso de volúmenes para desarrollo (`/app`, `node_modules`)
- [✅ ] Uso de `depends_on` para la relación entre servicios
- [ ✅] Verificar que todos los contenedores se comunican entre sí por nombre de servicio

### 📦 Construcción y Despliegue

- [✅ ] El entorno puede levantarse y apagarse con:
  ```bash
  docker-compose up / down
  ```

- [✅ ] El frontend consume correctamente una API del backend
- [✅ ] El backend puede leer/escribir datos en MongoDB

## 🧪 FASE 2: Evaluación en Vivo

### 🔄 Modificaciones en Tiempo Real

- [ ] Editar código en React (ej. cambiar un texto) y ver reflejado.
- [ ] Editar una ruta en Node.js y comprobar que el cambio se refleja al recargar

### 📋 Logs y Depuración

- [ ] Ver logs en tiempo real con:
  ```bash
  docker logs -f <container_id>
  ```

- [ ] Acceder al contenedor con:
  ```bash
  docker exec -it <container_id> bash
  ```

### ➕ Agregar Nueva Base de Datos

- [ ] Agregar un servicio adicional en `docker-compose.yml`, por ejemplo:
  - [✅ ] Redis
  - [ ] MariaDB
  - [ ] CouchDB

- [ ✅] Instalar la librería correspondiente en el backend (ej. `ioredis`, `mysql2`, etc.)

- [ ] Crear una funcionalidad en Node.js que:
  - [ ] Guarde un dato en la nueva base de datos
  - [ ] Lea ese dato y lo devuelva al frontend o vía API

## 🧠 Criterios de Evaluación (Checklist Interno)

| Criterio | Cumplido |
|----------|----------|
| Configuración y despliegue del entorno completo | [ ] |
| Uso correcto de Docker Compose y orquestación de servicios | [ ] |
| Capacidad de hacer cambios rápidos en frontend y backend | [ ] |
| Uso de CLI de Docker para logs e inspección | [ ] |
| Integración de una nueva base de datos y funcionalidad asociada | [ ] |

