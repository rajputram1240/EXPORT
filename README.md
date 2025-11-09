# Practivoo Shop — Public Site + Admin (Next.js + MongoDB)

Routes:
- `/` Home
- `/products` Products listing
- `/enquiry` Enquiry form (stores in MongoDB; view in `/admin/enquiries`)
- `/contact` Contact page with map
- `/admin/products` Product CRUD
- `/admin/enquiries` Enquiry list (demo only, no auth)

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```


## Admin Login
- Visit `/login` to sign in.
- Default credentials are set in `.env.example`: `ADMIN_USER` / `ADMIN_PASS`.
- `/admin/*` routes are protected by `middleware.ts` using an HMAC-signed cookie.
