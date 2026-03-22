# AliveBook

AliveBook is a full-stack bookstore demo with a redesigned minimal frontend and a NestJS CRUD backend.

## Apps in this repository

- **`AliveBook-frontend/`** — React + Vite storefront, orders view, and admin UI
- **`bookstore-backend/`** — NestJS + TypeORM API for managing books

## Frontend structure by role

### Reader-facing pages
- `/` — browse books, save favorites, and add to cart
- `/orders` — review the cart and adjust quantities

### Admin-facing pages
- `/books/list` — manage catalog items and edit selected books
- `/books/new` — create a new catalog entry

## Frontend highlights

- Stronger visual redesign with a more obvious layout change
- Icon-based favorite and cart actions
- Clearer separation between shopper flow and admin flow
- Admin editor panel no longer overlaps the catalog area
- Shared book form with live preview

## Backend highlights

- REST API for book CRUD
- MySQL connection through TypeORM
- Existing test suite kept working after the UI refresh

## Project structure

```text
AliveBook/
├── AliveBook-frontend/
├── bookstore-backend/
└── README.md
```

## Quick start

### 1. Install dependencies

```bash
cd AliveBook-frontend && npm install
cd ../bookstore-backend && npm install
```

### 2. Configure backend environment

Create `bookstore-backend/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=bookstore
```

### 3. Start backend

```bash
cd bookstore-backend
npm run start:dev
```

### 4. Start frontend

```bash
cd AliveBook-frontend
npm run dev
```

## Local URLs

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Books API: `http://localhost:3000/books`

## API routes

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`

Example create payload:

```json
{
  "bookname": "Atomic Habits",
  "ISBN": "James Clear",
  "price": 18.99,
  "image_url": "https://example.com/cover.jpg"
}
```

## Notes

- Favorites and cart live in Redux state and reset on refresh.
- The UI still uses the existing `ISBN` field as a secondary label because that matches the current backend model.
- Checkout is still a placeholder action.

## Per-project docs

- [`AliveBook-frontend/README.md`](./AliveBook-frontend/README.md)
- [`bookstore-backend/README.md`](./bookstore-backend/README.md)
