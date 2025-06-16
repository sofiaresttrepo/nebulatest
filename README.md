
# 🚀 Nebula Test - Fullstack + Redis (Dockerized)

Prueba técnica para evaluación Fullstack con Docker Compose.

---

## 📦 Tecnologías utilizadas

- ⚛️ Frontend: React (CRA)
- 🟩 Backend: Node.js (Express)
- 🐳 Base de datos NoSQL: Redis
- 📦 Docker + Docker Compose

---

## 🛠️ Requisitos previos

- Node.js + npm (solo para desarrollo local)
- Docker y Docker Compose instalados
- Git

---

## 🚀 Cómo iniciar el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nebula-test.git
   cd nebula-test
````

2. Levantar el entorno:

   ```bash
   docker-compose up --build
   ```

3. Acceder a:

   * Frontend: `http://localhost:3000`
   * API Backend: `http://localhost:5000`
   * Prueba Redis: `http://localhost:5000/api/redis`

---

## 📂 Estructura del Proyecto

```
nebula-test/
├── backend/          # API Express con conexión a Redis
├── frontend/         # React App
├── docker-compose.yml
└── README.md
```

---

## 🧪 Test rápido de Redis

Puedes usar Postman o navegador para hacer `GET` a:

```
http://localhost:5000/api/redis
```

Este endpoint guarda un valor de prueba en Redis y lo confirma en la respuesta.

---

## ❌ Cómo detener los servicios

```bash
docker-compose down
```

---

## 📌 Notas adicionales

* Usa `docker-compose logs -f backend` para inspeccionar logs del backend.

---

## 📫 Autor

Realizado por Sofía Restrepo para Nebula Engineering S.A.S.

```

---

