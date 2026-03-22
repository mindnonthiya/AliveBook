# AliveBook

AliveBook is a full-stack bookstore demo with a refreshed minimal UI.

The repository contains 2 apps:

- **`AliveBook-frontend/`** — React + Vite + Redux storefront and admin dashboard.
- **`bookstore-backend/`** — NestJS + TypeORM REST API for book CRUD.

## What is included

### Frontend
- Minimal storefront landing page
- Favorites and cart state via Redux Toolkit
- Order summary page
- Admin page for editing and deleting books
- Add-book page with live cover preview

### Backend
- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`
- MySQL connection through TypeORM

## Project structure

```text
AliveBook/
├── AliveBook-frontend/   # React client
├── bookstore-backend/    # NestJS API
└── README.md             # Main documentation
```

## Tech stack

### Frontend
- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Axios

### Backend
- NestJS 11
- TypeScript
- TypeORM
- MySQL
- class-validator / class-transformer

## How the apps work together

1. The frontend loads data from the backend using Axios.
2. The backend exposes `/books` endpoints.
3. Redux stores fetched books, favorites, and cart state in the frontend.
4. Admin pages create, update, and delete books through the API.

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## Quick start

### 1) Install dependencies

```bash
cd AliveBook-frontend && npm install
cd ../bookstore-backend && npm install
```

### 2) Configure the backend

Create a `.env` file inside `bookstore-backend/`.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=bookstore
```

> The backend currently reads MySQL settings from environment variables and allows CORS from `http://localhost:5173`.

### 3) Start the backend

```bash
cd bookstore-backend
npm run start:dev
```

### 4) Start the frontend

```bash
cd AliveBook-frontend
npm run dev
```

---

## Recommended development flow

### Run the backend first
The frontend expects the book API at:

```text
http://localhost:3000/books
```

### Then run the frontend
Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

---

## Main pages

### `/`
The storefront home page.

Features:
- Hero section with live project stats
- Book cards with favorite and add-to-cart actions
- Cart summary panel
- Favorites panel

### `/orders`
Order summary page.

Features:
- Quantity adjustment
- Remove items
- Cart total summary
- Checkout placeholder action

### `/books/list`
Admin catalog page.

Features:
- Book grid for management
- Inline edit action
- Delete action
- Metrics sidebar

### `/books/new`
Standalone add-book page.

Features:
- Structured form
- Live image preview
- Reusable form component shared with edit mode

---

## API overview

Base URL:

```text
http://localhost:3000
```

### Get all books
```http
GET /books
```

### Get one book
```http
GET /books/:id
```

### Create a book
```http
POST /books
Content-Type: application/json
```

Example body:

```json
{
  "bookname": "Atomic Habits",
  "ISBN": "James Clear",
  "price": 18.99,
  "image_url": "https://example.com/cover.jpg"
}
```

### Update a book
```http
PUT /books/:id
```

### Delete a book
```http
DELETE /books/:id
```

---

## Notes and limitations

- The frontend currently points to `http://localhost:3000/books` directly in the Redux slice.
- Cart and favorites are stored in Redux state only, so they reset on page refresh.
- Checkout is currently a placeholder UI action, not a real payment flow.
- The field named `ISBN` is currently used like an author/label field in the UI because that is how the existing data model is structured.

---

## Scripts

### Frontend

```bash
cd AliveBook-frontend
npm run dev
npm run build
npm run lint
```

### Backend

```bash
cd bookstore-backend
npm run start:dev
npm run build
npm run test
npm run test:e2e
```

---

## Suggested next improvements

- Add real author and description fields in the backend entity
- Add DTO validation for create/update requests
- Persist cart/favorites to localStorage
- Add search, filters, and categories
- Add authentication for admin routes
- Add a real checkout/order API

---

## Per-folder docs

- Frontend details: [`AliveBook-frontend/README.md`](./AliveBook-frontend/README.md)
- Backend details: [`bookstore-backend/README.md`](./bookstore-backend/README.md)
