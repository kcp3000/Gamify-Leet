# Gamify-Leet
Gamify your leetcoding experience!

## Local development

Install the project dependencies and create the API virtual environment by following the setup instructions below. Before starting the full stack, activate the API virtual environment:

```powershell
.\apps\api\.venv\Scripts\Activate.ps1
```

The preferred development command is:

```powershell
pnpm run dev
```

This opens the mprocs process dashboard with separate API and web processes. Select a process to view its logs. Use `r` to restart the selected process, `x` to stop it, and `q` to gracefully stop all processes and exit.

Individual services can also be started directly:

```powershell
pnpm run dev:api
pnpm run dev:web
```

The API runs at `http://localhost:8000` and the web app runs at `http://localhost:5173`.

### mprocs prerequisite

mprocs is a separate CLI prerequisite. Install it using the package manager appropriate for your operating system, then verify it is available with:

```text
mprocs --version
```
