# Gamify-Leet

Gamify your LeetCode experience.

## Local development

The current workflow runs the React frontend and Django API directly on the host operating system. It supports Windows, macOS, and Linux. Local Django development uses SQLite. Docker is not required.

### Prerequisites

- Git
- Node.js 20 or newer
- Python 3.11 or newer
- A terminal

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

Enable the repository commit hook:

```powershell
pnpm run setup:hooks
```

The hook validates manually created commit messages using the repository’s Conventional Commit format. It checks the commit type, optional scope, summary length, and trailing punctuation.

Before each commit, a fast validation hook also checks formatting, ESLint, frontend TypeScript, and Django configuration. Full production builds and broader tests remain appropriate for push/PR validation.

### 3. Create the local environment file

```powershell
Copy-Item .env.example .env
```

Keep secrets in `.env`; never commit them. The current Django development setup uses SQLite, so a Turso token is not required to run locally. Turso settings remain in the template for future hosted integration.

### 4. Create and configure the API environment

Windows PowerShell:

```powershell
py -m venv apps/api/.venv
.\apps\api\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r apps/api/requirements.txt
```

macOS/Linux:

```bash
python3 -m venv apps/api/.venv
source apps/api/.venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r apps/api/requirements.txt
```

If Windows PowerShell blocks activation, run this once and activate again:

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

Windows:

```powershell
winget install --id pvolok.mprocs --exact
```

macOS/Linux users should install mprocs through their preferred package manager or the official release binary. Verify it is available with:

```text
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

If `mprocs` is not recognized after installation, restart the terminal so its `PATH` is refreshed.

If Django reports `No module named 'django'`, ensure `apps/api/.venv` exists and reinstall the API requirements from step 4. The `dev:api` script automatically selects the platform-specific Python executable inside that environment.

If mprocs reports `unknown variant 'stop-proc'`, update the checkout:

```powershell
git pull --ff-only
```

The current configuration uses the supported `kill-proc` command.

The correct dependency command is `pnpm install`, not `pnpm intsall`.

### Commit message format

Use:

```text
<type>(<scope>): <summary>
```

Allowed types are `feat`, `fix`, `docs`, `refactor`, `test`, and `chore`. Summaries must be 72 characters or fewer and must not end with a period.

Examples:

```text
feat(web): add issue filters
fix(api): handle expired sessions
docs(readme): clarify local setup
```
