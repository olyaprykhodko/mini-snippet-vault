# mini-snippet-vault

A simple service for managing tagged snippets, including links, notes, and commands.

## Running with Docker Compose

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed

### Setup

1. Copy the example env file and adjust values if needed:

   ```bash
   cp .env.example .env
   ```

2. Build and start all services:
   ```bash
   docker compose up --build -d
   ```

The following services will be available:

| Service  | URL                       |
| -------- | ------------------------- |
| Frontend | http://localhost:8080     |
| Backend  | http://localhost:3000     |
| MongoDB  | mongodb://localhost:27017 |

## Local Development

### Prerequisites

- Node.js 22+
- MongoDB running locally on port `27017`

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
