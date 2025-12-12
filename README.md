# Cbus Customer Explorer UI

This is a React + Vite application for exploring customer data with pagination and search. It is designed to connect to a backend API (default: `http://localhost:3001`) and provides a clean, modern UI for browsing customer records.

## Features

- Browse customer records with pagination
- Search customers by name or email
- Responsive, accessible UI
- Error and loading states
- Written in TypeScript
- Unit tested with Vitest and Testing Library

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running backend API compatible with the customer endpoint (see `.env` for default URL)

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/imranbaluja/cbus-customer-explorer-ui.git
   cd cbus-customer-explorer-ui
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment:**

   - By default, the app expects a backend API at `http://localhost:3001`.
   - To change this, edit the `.env` file:
     ```env
     VITE_API_BASE_URL=http://localhost:3001
     ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (default Vite port).

## Running Tests

This project uses [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for unit tests.

```sh
npm test
```

## Building for Production

To build the app for production:

```sh
npm run build
```

The output will be in the `dist/` folder.

## Project Structure

- `src/` — Main source code
  - `components/` — UI components
  - `context/` — React context for state management
  - `hooks/` — Custom React hooks
  - `api/` — API client
  - `types/` — TypeScript types
  - `__tests__/` — Unit tests

## Linting

Lint the codebase using ESLint:

```sh
npx eslint .
```

## Deployment

The app is designed for static hosting (e.g., AWS S3 + CloudFront). See `cloudformation-frontend.yml` for an AWS deployment example.

## Notes for Interviewers

- The UI expects a backend API with a `/customers` endpoint supporting pagination and search (see `src/api/client.ts`).
- All code is TypeScript and follows modern React best practices.
- Tests are in `src/__tests__/` and can be run with `npm test`.

---

Feel free to reach out if you have any questions or issues running the project!
