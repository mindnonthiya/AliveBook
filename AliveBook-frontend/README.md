# AliveBook Frontend

React + TypeScript + Vite frontend for the AliveBook project.

## Features

- Refreshed minimal storefront UI
- Redux Toolkit state for books, cart, and favorites
- React Router navigation
- Shared book form for create/edit flows
- Responsive layouts for storefront, orders, and admin screens

## Pages

- `/` — storefront home
- `/orders` — order summary
- `/books/list` — admin catalog view
- `/books/new` — add book form

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## API expectation

The frontend currently fetches data from:

```text
http://localhost:3000/books
```

Make sure the backend is running before opening the storefront.

## Main folders

```text
src/
├── components/   # Pages and UI sections
├── store/        # Redux store and slice
├── App.tsx
├── App.css
└── index.css
```
