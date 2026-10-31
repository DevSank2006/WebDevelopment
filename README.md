# Anand Plus Development

A responsive React + Vite storefront inspired by the Anand Plus reference site. UI sections and pages are split into focused JSX components, styled with Tailwind classes directly in JSX, and use Axios for the demo REST API.

## Run the frontend

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The default `.env.example` settings use the Axios mock adapter, so the demo works without a running backend. To use the Spring Boot API, copy `.env.example` to `.env`, set `VITE_USE_MOCK_API=false`, and keep `VITE_API_URL=http://localhost:8080/api`. Restart Vite after changing environment values.

## Run the optional Spring Boot fake API

Requirements: Java 17+ and Maven.

```bash
cd backend
mvn spring-boot:run
```

The in-memory API runs at `http://localhost:8080/api`. It provides `GET /packages`, `GET /packages/{id}`, `GET /cart`, `POST /cart/items`, `POST /contact`, `POST /auth/signin`, and `POST /auth/register`. Cart data and contact submissions are demo-only and reset when the backend restarts. No real payment, email, or account is created.

## Project map

```text
src/
  components/
    home/          # Individual homepage sections
    layout/        # Shared header, footer, chat widget
    packages/      # Package cards and artwork
    ui/            # Reusable buttons, headings, messages
  data/            # Deterministic demo catalog
  hooks/           # Cart state hook
  pages/           # Route-level pages
  services/        # Axios adapter and API methods
backend/            # Optional Spring Boot in-memory REST API
```

## Demo behavior

- Package search, category filters, package detail pages, and cart actions are interactive.
- Contact and sign-in forms use demo endpoints. They do not send email or create real accounts.
- `VITE_USE_MOCK_API=true` is the default and routes Axios through a local deterministic adapter with Spring-style paths and response shapes.
