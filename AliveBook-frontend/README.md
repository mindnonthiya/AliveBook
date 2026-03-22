# AliveBook Frontend

React + TypeScript + Vite frontend for AliveBook.

## What changed in the refreshed UI

- Stronger minimal visual direction with a cleaner layout and quieter color palette
- Icon-first actions for **favorites** and **cart** instead of text-heavy buttons
- Editorial-style home page with featured book, utility dock, and cleaner shelf cards
- Refined orders page with compact quantity controls and a more minimal summary panel
- Tidier admin dashboard and shared live-preview form for create/edit flows

## Routes

- `/` — storefront and featured shelf
- `/orders` — order summary and quantity controls
- `/books/list` — admin dashboard
- `/books/new` — add book form

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
