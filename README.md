# AI Document Validator – Playwright + TypeScript

This project is a **portfolio-ready automation framework** that simulates an AI/OCR powered document validator and tests it end-to-end with **Playwright + TypeScript**.

## 🎯 What this project demonstrates

- UI automation with **Playwright Test + Page Object Model**
- API contract testing for `/api/analyze`
- Basic **AI-style logic testing** (document type + confidence thresholds)
- Cross-browser runs (Chromium, Firefox, WebKit)
- Node.js/Express app used as a demo SUT (system under test)

## 🧩 App Overview

The mini web app allows a user to:

1. Upload a PDF.
2. Click **“Analyze with AI”**.
3. See:
   - Detected document type: `INVOICE`, `CONTRACT`, or `UNKNOWN`
   - Confidence score (percentage)
   - Mock extracted text and key fields

Behind the scenes, the backend simulates an **AI/OCR engine** using simple rules based on the file name (e.g. files containing `invoice` are treated as invoices).

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

### API Tests

- `api/ai-contract.spec.ts`  
  - Sends a multipart POST to `/api/analyze`
  - Asserts response schema:
    - `fileName`, `documentType`, `confidence`, `extractedText`
    - `fields.name`, `aiModel`, `ocrEngine`, `safetyChecks`

## 🏗 Tech Stack

- **Node.js + Express + Multer** – demo backend + file upload
- **Playwright Test + TypeScript** – automation framework
- Runs locally on `http://localhost:3000`

## ▶️ How to run

```bash
npm install
npx playwright install --with-deps
npx playwright test       # run all tests
npx playwright show-report  # open HTML report
