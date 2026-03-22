# AliveBook Frontend

React + TypeScript + Vite frontend for AliveBook.

## UX direction in the current version

- **Storefront pages** are for readers: browsing, favorites, cart, and order summary
- **Admin pages** are separate: catalog management and adding/editing books
- Favorites and cart now use icon-first actions instead of text-heavy buttons
- The admin edit area is now compact and fixed so it does not overlap the catalog list

## Routes

### Reader-facing
- `/` — storefront and featured shelf
- `/orders` — order summary and quantity controls

### Admin-facing
- `/books/list` — admin catalog dashboard
- `/books/new` — dedicated admin page for adding a new book

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## API target

The frontend currently calls:

```text
http://localhost:3000/books
```

Run the backend before starting the UI.

## Main source folders

```text
src/
├── components/   # screens, layout, icons
├── store/        # redux store and async logic
├── App.tsx
├── App.css
└── index.css
```
