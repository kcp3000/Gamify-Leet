# Gamify-Leet

Gamify your LeetCode experience.

## Local development on Windows

The current workflow runs the React frontend and Django API directly on Windows. Local Django development uses SQLite. Docker is not required.

### Prerequisites

- Git
- Node.js 20 or newer
- Python 3.11 or newer
- PowerShell
- WinGet

mprocs is a separate terminal application used to display and control the frontend and backend processes.

### 1. Clone or update the repository

```powershell
git clone https://github.com/kcp3000/Gamify-Leet.git
cd Gamify-Leet
```

For an existing checkout:

```powershell
git pull --ff-only
```

### 2. Install JavaScript dependencies

From the repository root:

```powershell
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm install
```

### 3. Create the local environment file

```powershell
Copy-Item .env.example .env
```

Keep secrets in `.env`; never commit them. The current Django development setup uses SQLite, so a Turso token is not required to run locally. Turso settings remain in the template for future hosted integration.

### 4. Create and configure the API environment

```powershell
py -m venv apps/api/.venv
.\apps\api\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r apps/api/requirements.txt
```

If PowerShell blocks activation, run this once and activate again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### 5. Check Django and apply migrations

```powershell
.\apps\api\.venv\Scripts\python.exe apps/api/manage.py check
.\apps\api\.venv\Scripts\python.exe apps/api/manage.py makemigrations
.\apps\api\.venv\Scripts\python.exe apps/api/manage.py migrate
```

The local database is `apps/api/db/dev.sqlite3`. It is ignored by Git.

### 6. Install mprocs

```powershell
winget install --id pvolok.mprocs --exact
```

Close and reopen PowerShell after installation, then verify:

```powershell
mprocs --version
```

### 7. Start the full stack

```powershell
pnpm run dev
```

This opens the mprocs dashboard with:

- `api` — Django at `http://localhost:8000`
- `web` — Vite at `http://localhost:5173`

Select a process in the left pane to view its logs on the right. Controls:

- `r` — restart the selected process
- `x` — kill the selected process
- `q` — gracefully stop all processes and exit

### Run services individually

```powershell
pnpm run dev:api
pnpm run dev:web
```

The frontend proxies `/api` requests to Django on port 8000.

### Verification commands

```powershell
pnpm --filter gamify-leet-web build
.\apps\api\.venv\Scripts\python.exe apps/api/manage.py check
```

### Troubleshooting

If `mprocs` is not recognized after installation, close the terminal completely and open a new PowerShell session. Existing terminals keep the old `PATH`.

If Django reports `No module named 'django'`, ensure `apps/api/.venv` exists and reinstall the API requirements from step 4. The `dev:api` script uses the project virtual environment directly.

If mprocs reports `unknown variant 'stop-proc'`, update the checkout:

```powershell
git pull --ff-only
```

The current configuration uses the supported `kill-proc` command.

The correct dependency command is `pnpm install`, not `pnpm intsall`.
