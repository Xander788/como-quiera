# Frontend

Frontend React (JSX) for the Parqueo backend.

Run locally:

```bash
cd Frontend
npm install
npm run dev
```

The app expects the backend at `http://localhost:4000` (this matches the project's Backend/.env). If your backend uses another port, set `VITE_API_BASE` in the environment before `npm run dev`.

Example (PowerShell):

```powershell
$env:VITE_API_BASE = "http://localhost:4000"
npm run dev
```

Example (CMD):

```cmd
set VITE_API_BASE=http://localhost:4000&& npm run dev
```
