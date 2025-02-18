# 🧠 Multi-Agents

An intelligent backend service built with **NestJS** that allows users to create and interact with AI-powered agents.

## 🚀 Features

- **User Authentication** (JWT-based)
- **Agent Creation** (Worker & Manager types)
- **Agent Interaction** (Chat history storage)
- **Secure API Access** (Protected routes)

## 🛠️ Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: SQLite (Can be extended to PostgreSQL, MySQL)
- **Auth**: JWT (JSON Web Token)

## 📦 Start Project

1. Install dependencies through npm.

```bash
cd agent-service
npm install
```

2. Create a .env file and you can design your own secrect key.

```bash
echo JWT_SECRECT=wenhaoyou > .env
```

3. Run the backend.

```bash
npm run start
```

The default server should be running on http://localhost:3000.
