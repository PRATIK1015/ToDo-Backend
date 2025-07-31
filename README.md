# Todo List REST API


## Features

* User Signup & Login (with JWT-based auth)
* Create, Read, Update, Delete (CRUD) for Todos
* Auth-protected routes using middleware
* Swagger API Documentation (OpenAPI 3)
* Request validation using `express-validator`
* Environment-based config using `.env`

---

## Tech Stack

* **Node.js + Express** — API server
* **TypeScript** — Type-safe development
* **MongoDB + Mongoose** — NoSQL database
* **JWT** — Token-based authentication
* **Swagger** — Auto-generated API docs
* **dotenv** — Secure environment config
* **express-validator** — Input validation

---

## ⚒️ Installation

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file using the example:

```bash
cp .env.example .env
```

---

## 📜 Scripts

| Command            | Description                                     |
| ------------------ | ----------------------------------------------- |
| `npm run dev`      | Start development server (TypeScript + nodemon) |
| `npm run build`    | Compile TypeScript into `dist/`                 |
| `npm start`        | Run built JS from `dist/index.js`               |

---

## 📘️ API Documentation

Swagger UI is available at:

```
[http://localhost:8089/api-docs](https://todo-backend-e335.onrender.com/api-docs/)
```
or

if locally run
```
http://localhost:8089/api-docs
```


Click **"Authorize"** and enter your JWT token to test protected routes.

---
