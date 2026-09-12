# RETO — AI-assisted retinal screening

RETO is a full-stack application for retinal fundus-image screening. It helps
clinicians record a patient, run an AI-assisted scan, review the coloured
Grad-CAM explanation, generate a PDF report, and create a referral when
follow-up is needed.

> RETO is a screening-support tool only. It is not a diagnostic device and
> does not replace examination or treatment by a qualified eye-care
> professional.

## What it includes

- JWT-backed clinician signup, login, profile verification, and logout
- Patient registry with longitudinal scan history
- Fundus image upload and backend inference workflow
- Coloured Grad-CAM heatmap display for each scan
- Downloadable scan reports and referral letters as PDFs
- Referral workflow with selectable demo facilities
- FastAPI backend and Vite/React frontend

## Project layout

```text
backend/        FastAPI application, database models, ML integration and tests
frontend/       Vite + React clinician interface
```

## Run locally

### 1. Start the backend

Use Python 3.10 or newer.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API starts at `http://127.0.0.1:8000`; interactive API documentation is
available at `http://127.0.0.1:8000/docs`.

### 2. Start the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL (normally `http://localhost:5173`). The default
frontend API endpoint is `http://127.0.0.1:8000/api/v1`.

To point the frontend at another API deployment, create `frontend/.env.local`:

```bash
VITE_API_URL=https://your-api.example/api/v1
```

## Typical workflow

1. Create a clinician account, then log in.
2. Start a new screening and enter the patient details.
3. Upload a JPG, JPEG, or PNG fundus image.
4. Review the risk level and coloured Grad-CAM explanation.
5. Download the scan report or create a referral letter if follow-up is needed.
6. Use **Patient history** to reopen prior scans and reports.

## Development checks

```bash
cd frontend
npm run build
npm run lint
```

Backend tests are in `backend/tests`. After installing backend dependencies,
run them with:

```bash
cd backend
pytest
```

## Deployment and configuration

The backend reads configuration from environment variables. The most important
production settings are `DATABASE_URL`, `SECRET_KEY`, `ALLOWED_ORIGINS`, and
`MODEL_PATH`. Never use the development JWT secret in production. Deployment
configuration is available in `backend/render.yaml`.

## Notes

- The bundled referral facilities are demo data and must be replaced with a
  verified referral network before real-world use.
- The inference layer currently follows the repository's configured model
  backend; provide production model weights through `MODEL_PATH`.
