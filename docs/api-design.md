# Muti-Agents API Documentation

## Overview

This API allows users to authenticate, create AI agents (worker/manager types), and interact with them via a chat interface. The system supports JWT-based authentication and stores conversation history.

## Base URL

```
http://localhost:3000
```

---

## Authentication

### 1. Register a New User

**Endpoint:**

```
POST /users/register
```

**Request Body:**

```json
{
  "username": "testuser",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "id": 1,
  "username": "testuser"
}
```

### 2. User Login

**Endpoint:**

```
POST /auth/login
```

**Request Body:**

```json
{
  "username": "testuser",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "access_token": "your-jwt-token"
}
```

> **Note:** Include the token in `Authorization` header for all protected routes as `Bearer your-jwt-token`.

---

## Agents

### 3. Create an Agent (Protected)

**Endpoint:**

```
POST /agents
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Request Body:**

```json
{
  "name": "Support Bot",
  "prompt": "You are a helpful assistant",
  "type": "worker"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Support Bot",
  "prompt": "You are a helpful assistant",
  "type": "worker"
}
```

### 4. Get All Agents

**Endpoint:**

```
GET /agents
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Support Bot",
    "prompt": "You are a helpful assistant",
    "type": "worker"
  }
]
```

### 5. Get an Agent by ID

**Endpoint:**

```
GET /agents/{id}
```

**Example Response:**

```json
{
  "id": 1,
  "name": "Support Bot",
  "prompt": "You are a helpful assistant",
  "type": "worker"
}
```

### 6. Update an Agent (Protected)

**Endpoint:**

```
PUT /agents/{id}
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Request Body:**

```json
{
  "name": "Updated Bot",
  "prompt": "You are an advanced assistant"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Updated Bot",
  "prompt": "You are an advanced assistant",
  "type": "worker"
}
```

### 7. Delete an Agent (Protected)

**Endpoint:**

```
DELETE /agents/{id}
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Response:**

```json
{
  "message": "Agent deleted successfully"
}
```

---

## Chat History

### 8. Chat with an Agent (Protected)

**Endpoint:**

```
POST /agents/{id}/chat
```

**Headers:**

```
Authorization: Bearer your-jwt-token
```

**Request Body:**

```json
{
  "message": "Hello, how are you?"
}
```

**Response:**

```json
{
  "id": 1,
  "agentId": 1,
  "userId": 1,
  "message": "Hello, how are you?",
  "response": "I'm here to help!",
  "createdAt": "2025-02-18T02:30:00.000Z"
}
```

### 9. Get Chat History for an Agent

**Endpoint:**

```
GET /agents/{id}/chat
```

**Response:**

```json
[
  {
    "id": 1,
    "agentId": 1,
    "userId": 1,
    "message": "Hello, how are you?",
    "response": "I'm here to help!",
    "createdAt": "2025-02-18T02:30:00.000Z"
  }
]
```

---

## Error Handling

All error responses follow this structure:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

- `401 Unauthorized` → Invalid or missing JWT token.
- `404 Not Found` → Agent or user not found.
- `400 Bad Request` → Missing fields or incorrect request body.

---

## Notes

- **Ensure the JWT token is included** in protected routes.
- **Agents can have types**: `worker` or `manager`.
- **Chat responses are mock responses**; integrate AI services for real interactions.
