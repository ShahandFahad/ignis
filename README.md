# 🧠 Ignis - Full Stack Chatbot App (Node.js + TypeScript + Next.js + ShadCN UI + OpenAI)

A full-stack, production-ready chatbot web application built using:

- **Backend**: Node.js, TypeScript, Express, JWT Auth, OpenAI API
- **Frontend**: Next.js App Router, TypeScript, ShadCN UI

## 📁 Project Structure

```bash
.
└── ignis/               # Node.js + TypeScript API (Express)
    └── .env.example       # Example environment variables for backend
    │
    └── chatbot_ui/            # Next.js 14 App Router frontend
        └── .env.example       # Example environment variables for frontend
````

---

*Define the .env files, `.env.example` files left for reference.*

## 🚀 Getting Started

### 🔧 Prerequisites

* Node.js ≥ 18
* Yarn or npm
* OpenAI API Key (for chatbot responses)

---

## 🔐 Setup Environment

### Ignis (`/`)

```bash
cp .env.example .env
```

Add values for:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Frontend (`/chatbot_ui`)

```bash
cd chatbot_ui
cp .env.example .env
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5050/api/v1
```

---

## 🛠️ Run Project Locally

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

### 2. Start Frontend

```bash
cd chatbot_ui
npm install
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

## 🧪 CURL API Testing (Backend)

### 🔐 Registeration
```bash
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "user@example.com", "password": "pass123"}'

```

### 🔐 Login

```bash
curl -X POST http://localhost:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "user@example.com", "password": "pass123"}'
```

### 🧠 Ask Ignis (Requires Bearer Token)

```bash
curl -X POST http://localhost:5050/api/chat \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username":"user@example.com", "message": "Hi, How can you help me?"}'
```

### 🧠 Extract Chat History from Ignis (Requires Bearer Token)

```bash
curl -X POST http://localhost:5050/api/chat/history/user@example.com\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

---

## 📦 Build

### Backend

```bash
cd ignis 
npm run build
```

### Frontend

```bash
cd chatbot_ui
npm run build
```

---

### Docker Commnads

```bash
// Build and Run with Docker Compose
docker-compose up --build

// Install new npm packages inside container:
docker-compose exec ignis npm install some-package

// Rebuild when dependencies change:
docker-compose up --build

TODO: Dockerize client side
```
---
## 📜 License

MIT – Free to use and modify.


## 👨‍💻 Author

Built with ❤️ by **FAHAD**
