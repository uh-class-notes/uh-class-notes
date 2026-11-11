# Project Name

> Briefly describe the purpose of this project.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- PostgreSQL

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `sample.env` to `.env` and set `DATABASE_URL` and `AUTH_SECRET`.
3. Create the database named in `DATABASE_URL`.
4. Apply the database schema and generate the Prisma client:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run playwright` | Run Playwright tests (build first) |

## Project Structure

- `src/app/` — application routes and layouts
- `src/components/` — shared UI components
- `src/lib/` — application services and utilities
- `prisma/` — database schema and migrations
- `tests/` — browser tests

## Configuration

See `sample.env` for the required environment variables. Replace all example values with values appropriate for your environment. Use a unique, securely generated secret for `AUTH_SECRET`.

## Contributing

Describe how to contribute, report issues, or propose changes.

## License

Specify the project's license.
