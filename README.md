# Warehouse Management System (Frontend)

This is the frontend of a Warehouse Management System, built with **Vue 3**, **TypeScript**, and **Bootstrap**. It communicates with a backend API to manage users, products, and locations.

## Features

- User authentication (login)
- Product management: add, edit, delete, list
- Location management: add, edit, delete, list
- Automatic JWT token storage and usage for secure API requests

## Installation

1. Clone the project:

```bash
git clone https://github.com/aurelienbono/mswebclient-debytes-io
cd mswebclient-debytes-io
````

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown by Vite).

## Configuration

* The backend API URL is set in `services/apiService.ts` (`BASE_URL`).
* After login, the JWT token is stored in `localStorage` and used for all secure API requests.

## Deployment

To build the project for production:

```bash
npm run build
```

The `dist` folder will contain the production-ready build.

## Technologies

* Vue 3 + TypeScript
* Vue Router
* Axios for HTTP requests
* Bootstrap 5 for styling

```
