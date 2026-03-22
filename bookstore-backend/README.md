# AliveBook Backend

NestJS backend for the AliveBook bookstore project.

## Responsibilities

- Connect to MySQL with TypeORM
- Expose CRUD endpoints for books
- Accept requests from the frontend running on `http://localhost:5173`

## Install

```bash
npm install
```

## Environment variables

Create a `.env` file in this folder.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=bookstore
```

## Start the server

### Development

```bash
npm run start:dev
```

### Production build

```bash
npm run build
npm run start:prod
```

## Test commands

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## API routes

### `GET /books`
Return all books.

### `GET /books/:id`
Return one book by id.

### `POST /books`
Create a new book.

Example payload:

```json
{
  "bookname": "Deep Work",
  "ISBN": "Cal Newport",
  "price": 21.5,
  "image_url": "https://example.com/deep-work.jpg"
}
```

### `PUT /books/:id`
Update an existing book.

### `DELETE /books/:id`
Delete a book.

## Entity shape

Current book entity fields:

- `id`
- `bookname`
- `ISBN`
- `price`
- `image_url`

## Important note

In the current UI, the `ISBN` field is displayed more like an author/secondary label.
If you want cleaner domain modeling later, consider splitting it into separate `author` and `isbn` fields.
