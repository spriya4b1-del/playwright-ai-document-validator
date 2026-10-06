# AI Document Validator – Playwright + TypeScript

This project is a **portfolio-ready automation framework** that simulates an AI/OCR powered document validator and tests it end-to-end with **Playwright + TypeScript**.

## 🎯 What this project demonstrates

- UI automation with **Playwright Test + Page Object Model**
- API contract testing for `/api/analyze`
- Basic **AI-style logic testing** (document type + confidence thresholds)
- Cross-browser runs (Chromium, Firefox, WebKit)
- Node.js/Express app used as a demo SUT (system under test)
- CI with **Azure DevOps** (tests run on every push to `main`)

## 🧩 App Overview

The mini web app allows a user to:

1. Upload a PDF.
2. Click **“Analyze with AI”**.
3. See:
   - Detected document type: `INVOICE`, `CONTRACT`, or `UNKNOWN`
   - Confidence score (percentage)
   - Mock extracted text and key fields

Behind the scenes, the backend simulates an **AI/OCR engine** using simple rules based on the **file name only** (the file contents are not read):

| File name contains | Document type | Confidence |
|---|---|---|
| `invoice` | `INVOICE` | 92% |
| `contract` | `CONTRACT` | 92% |
| anything else | `UNKNOWN` | 65% |

### Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/analyze` | Upload a file (form field `document`) and get the mock AI analysis |
| `GET` | `/health` | Health check – returns `{ "status": "OK" }` |

## 📁 Project Structure

```
app/
  server.js              # Express backend (mock AI/OCR endpoint)
  public/index.html      # Frontend: upload form + results
src/pages/               # Page Objects
  upload.page.ts         # Upload form actions
  results.page.ts        # Results assertions
tests/
  ui/                    # Browser (end-to-end) tests
  api/                   # API tests
  resources/             # Test data (sample PDFs)
playwright.config.ts     # Playwright settings (browsers, retries, reports, web server)
azure-pipelines.yml      # Azure DevOps CI pipeline
```

## 🧪 Test Coverage

### UI Tests

- `ui/upload-and-analyze.spec.ts`
  - Uploads `sample-invoice.pdf`
  - Verifies:
    - File name displayed
    - Type = `INVOICE`
    - Confidence ≥ 80%

- `ui/unknown-doc-type.spec.ts`
  - Uploads `random-doc.pdf`
  - Verifies:
    - Type = `UNKNOWN`
    - Confidence ≥ 50%

- `ui/unknown-confidence.spec.ts`
  - Uploads `random-doc.pdf`
  - Verifies:
    - Type = `UNKNOWN`
    - Confidence ≥ 65%

### API Tests

- `api/ai-contract.spec.ts`
  - Sends a multipart POST to `/api/analyze`
  - Asserts response schema:
    - `fileName`, `documentType`, `confidence`, `extractedText`
    - `fields.name`, `aiModel`, `ocrEngine`, `safetyChecks`

## 🏗 Tech Stack

- **Node.js + Express + Multer** – demo backend + file upload
- **Playwright Test + TypeScript** – automation framework
- **Azure DevOps Pipelines** – CI
- Runs locally on `http://localhost:3000`

## ▶️ How to run

### Install (first time only)

```bash
npm install
npx playwright install --with-deps
```

### Run the app manually

```bash
npm run dev
```

Open http://localhost:3000, upload a file and click **Analyze with AI**. Press `Ctrl + C` to stop.

### Run the tests

Playwright starts the app automatically (see `webServer` in `playwright.config.ts`), so you don't need to start it first.

```bash
npm test                 # run all tests in all browsers
npm run test:ui          # UI tests only
npm run test:api         # API tests only
npm run test:report      # open the HTML report
```

Run a single test file in one browser:

```bash
npx playwright test tests/ui/unknown-confidence.spec.ts --project=chromium
```

Watch the test run in a visible browser:

```bash
npx playwright test --headed --project=chromium
```

On failure, Playwright saves a **screenshot** and **video** under `test-results/`, and failed tests are **retried once**.

## 🔁 CI/CD

`azure-pipelines.yml` runs on every push to `main`:

1. Installs Node.js 20.x
2. Installs npm dependencies
3. Installs Playwright browsers
4. Runs all Playwright tests (UI + API)
5. Publishes the Playwright HTML report as a pipeline artifact (`playwright-report`)
