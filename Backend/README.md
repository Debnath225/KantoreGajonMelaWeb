# Kantore Backend API

Secure REST API for the Kantore Gajon Mala project.

## Features
- Express + MongoDB (Mongoose)
- Security middleware: `helmet`, `cors` allowlist, `hpp`, payload limits
- Global and strict write rate limiting
- Zod request validation for body/query
- Centralized JSON error handling
- Admin-only endpoints guarded by API key or admin JWT
- Cloudinary signed uploads for secure media management

## Quick Start
1. Copy env file:
   - `cp .env.example .env`
2. Fill `.env` values, especially `MONGO_URI` and `ADMIN_API_KEY`.
3. Install dependencies:
   - `npm install`
4. Run dev server:
   - `npm run dev`

API base: `http://localhost:8080/api/v1`

## Public Endpoints
- `GET /health`
- `GET /events?page=1&limit=12`
- `GET /gallery?page=1&limit=12`
- `GET /faqs`
- `POST /contact`
- `POST /questions`
- `POST /newsletter/subscribe`
- `POST /media/sign-upload` (requires `Authorization: Bearer <token>`)

## Auth Endpoints
- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me` (requires `Authorization: Bearer <token>`)

## Admin Endpoints
Send one of:
- `x-api-key: <ADMIN_API_KEY>`
- `Authorization: Bearer <admin_jwt_token>`

- Events CRUD:
  - `GET /admin/events`
  - `POST /admin/events`
  - `PUT /admin/events/:id`
  - `DELETE /admin/events/:id`
- Gallery CRUD:
  - `GET /admin/gallery`
  - `POST /admin/gallery`
  - `PUT /admin/gallery/:id`
  - `DELETE /admin/gallery/:id`
- FAQ CRUD:
  - `GET /admin/faqs`
  - `POST /admin/faqs`
  - `PUT /admin/faqs/:id`
  - `DELETE /admin/faqs/:id`
- Inbound data:
  - `GET /admin/contacts`
  - `GET /admin/subscribers`
  - `GET /admin/questions`
- Media:
  - `POST /admin/media/sign-upload` (returns Cloudinary signature payload)

## Test Route Protection
- `npm test`
