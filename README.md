Dockerized To-Do App (Laravel + MySQL + React)

A tiny, production-like setup that meets the assessment:

Create tasks (title + description)

Show only the latest 5 non-completed tasks

Mark task as Done (then it disappears)

3 services via Docker Compose: MySQL, Laravel API, React SPA

Backend + frontend unit tests

Clear, minimal REST API

🧱 Tech Stack

Backend: PHP 8.3, Laravel 11

DB: MySQL 8 (can swap to MariaDB if needed)

Frontend: React 18 + Vite

Orchestration: Docker Compose

🚀 Quickstart

Prereqs:

Windows/macOS/Linux with Docker Desktop (includes Compose)

On Windows: WSL2 enabled and Linux containers mode

# from project root (where docker-compose.yml lives)
docker compose up --build


Open:

Frontend (React): http://localhost:3000

API health: http://localhost:8080/api/health

Stop the stack:

docker compose down

📁 Project Structure
.
├─ docker-compose.yml
├─ backend/
│  ├─ Dockerfile
│  ├─ start.sh
│  └─ overlay/
│     ├─ app/Http/Controllers/TaskController.php
│     ├─ app/Models/Task.php
│     ├─ config/cors.php
│     ├─ database/migrations/2024_01_01_000000_create_tasks_table.php
│     ├─ database/factories/TaskFactory.php   # optional
│     ├─ routes/api.php
│     ├─ tests/Feature/TaskApiTest.php
│     └─ phpunit.xml
└─ frontend/
   ├─ Dockerfile
   ├─ package.json
   ├─ vite.config.js
   └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ api.js
      ├─ styles.css
      └─ components/
         ├─ TaskForm.jsx
         └─ TaskList.jsx
         └─ __tests__/
            ├─ TaskForm.test.jsx
            └─ TaskList.test.jsx

🔌 Services & Ports
Service	Port	Description
frontend	3000	React SPA (Vite)
backend	8080	Laravel API (PHP server)
db	3306	MySQL 8
🔐 Environment (Compose sets these)

Backend → DB env

DB_HOST=db
DB_PORT=3306
DB_DATABASE=todo
DB_USERNAME=todo
DB_PASSWORD=todo


Frontend → API base

VITE_API_URL=http://localhost:8080/api

🧪 Tests

Backend (PHPUnit)

docker compose exec backend php artisan test


Frontend (Vitest + RTL)

docker compose exec frontend npm test


Backend tests use sqlite in-memory (configured via phpunit.xml) and run migrations automatically.

📚 API Reference

Base URL: http://localhost:8080/api

GET /tasks

Returns latest 5 tasks that are not completed.

200 OK

[
  { "id": 1, "title": "Buy books", "description": "For school", "is_completed": false, "created_at": "...", "updated_at": "..." }
]

POST /tasks

Create a new task.

Request

{
  "title": "Buy books",
  "description": "For school"
}


201 Created

{
  "id": 1, "title": "Buy books", "description": "For school", "is_completed": false, "created_at": "...", "updated_at": "..."
}

PATCH /tasks/{id}/complete

Mark as completed (hidden from list afterwards).

204 No Content

GET /health

Health probe:

{ "ok": true }

🗃️ Database Schema

tasks table

id (PK, auto)

title (string, 255)

description (text, nullable)

is_completed (boolean, default false)

created_at / updated_at

Index on (is_completed, created_at) to support list query

🛠️ Common Commands
# build & run
docker compose up --build

# run detached (background)
docker compose up -d

# stop and remove
docker compose down

# clean volumes (DB wipe)
docker compose down --volumes

# show logs
docker compose logs -f

# rebuild without cache
docker compose build --no-cache

# run backend shell
docker compose exec backend bash

# run frontend shell
docker compose exec frontend sh
