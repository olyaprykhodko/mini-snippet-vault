# Mini Snippet Vault

Tagged snippet vault for notes, links, and shell commands. The project includes a NestJS + MongoDB API and a Next.js frontend with create, search, filter, edit, delete, loading, empty, and error states.

## Stack

- Backend: NestJS, Mongoose, MongoDB, class-validator
- Frontend: Next.js App Router, React, Tailwind CSS
- Infra: Docker Compose

## Features

- Snippet list page with create form
- Snippet details page with edit and delete actions
- Search by text and filter by tag
- Validation for required fields
- Pagination in the UI and API
- Automatic Mongo seed on first startup when the snippets collection is empty

## Environment Variables

Root `.env`:

```env
TZ=Europe/Kyiv
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
MONGO_CONNECTION_URI=mongodb://root:example@mongo:27017/snippet_vault?authSource=admin
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Backend local `.env` in `backend/`:

```env
MONGO_CONNECTION_URI=mongodb://root:example@localhost:27017/snippet_vault?authSource=admin&directConnection=true
```

Frontend local `.env` in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Run with Docker (Recommended)

### Prerequisites

- Docker
- Docker Compose

### Start

```bash
git clone https://github.com/olyaprykhodko/mini-snippet-vault
cp .env.example .env
docker compose up --build
```

Services are running on ports:

| Service  | URL                       |
| -------- | ------------------------- |
| Frontend | http://localhost:8080     |
| Backend  | http://localhost:3000     |
| MongoDB  | mongodb://localhost:27017 |

On the first backend startup, the app inserts 15 demo snippets if the collection is empty.

## Local Development

### Prerequisites

- Node.js 22+
- npm
- MongoDB running on `localhost:27017`

```bash
git clone https://github.com/olyaprykhodko/mini-snippet-vault
```

### Run backend

```bash
cd backend
cp .env.example .env
npm i
npm run start:dev
```

Backend runs on `http://localhost:3000`.

### Run frontend

```bash
cd frontend
cp .env.example .env
npm i
npm run dev
```

Frontend runs on `http://localhost:3000` by default in local mode unless you change the Next.js port. In Docker, it is published on `http://localhost:8080`.
If the backend is already using `3000`, start the frontend on another port, for example:

```bash
npm run dev -- --port 3001
```

## Production Build

### Backend

```bash
cd backend
npm install
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run start
```

## API

All responses use the shape:

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

### Create snippet

`POST /snippets`

```json
{
  "title": "Use ripgrep",
  "content": "rg \"search term\" .",
  "tags": ["cli", "search"],
  "type": "command"
}
```

### Get snippets

`GET /snippets?page=1&limit=6&q=rg&tag=cli`

Response `data`:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 6,
  "totalPages": 1
}
```

### Get snippet by id

`GET /snippets/:id`

### Update snippet

`PATCH /snippets/:id`

```json
{
  "title": "Updated title",
  "content": "Updated content",
  "tags": ["updated", "tag"],
  "type": "note"
}
```

### Delete snippet

`DELETE /snippets/:id`

## Notes

- Supported snippet types: `note`, `link`, `command`
- Search works against title and content
- Tag filtering is exact match
- Seed data is skipped when the snippets collection already contains documents

## Deploy

MongoDB and frontend app are deployed on [Vercel](https://vercel.com), and backend is published on [Render](https://render.com).
Try the [demo app](https://mini-snippet-vault-frontend.vercel.app/snippets)

### Important: All serviced are deployed on free instances, and spin down with inactivity, which can delay requests by 50 seconds or more.
