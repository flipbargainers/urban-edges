# Urban Edges - Frontend + Backend

## Project structure
- `frontend/index.html` - frontend UI (converted from your single-file app)
- `backend/server.js` - backend API + static server
- `backend/package.json` - backend dependencies and scripts

## Run with terminal (Windows PowerShell)
1. Install backend dependencies:
```powershell
cd "c:\Users\Sayed Anas\Documents\index.html\backend"
npm install
```

2. Start the server:
```powershell
npm run dev
```

3. Open in browser:
- `http://localhost:3000`

## API endpoints
- `GET /api/health`
- `GET /api/bootstrap`
- `GET /api/products`
- `GET /api/reviews`
- `POST /api/auth/login`
- `POST /api/subscribe`
- `POST /api/orders`

## Notes
- Frontend now fetches data/actions from backend.
- If backend is unavailable, frontend falls back to local seed data for products/reviews/hero images.

