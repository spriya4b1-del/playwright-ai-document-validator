import { test, expect } from '@playwright/test';
import path from 'path';
import { UploadPage } from '../../src/pages/upload.page';
import { ResultsPage } from '../../src/pages/results.page';

test('UNKNOWN document should have confidence of at least 65%', async ({ page }) => {
  const uploadPage = new UploadPage(page);
  const resultsPage = new ResultsPage(page);

  // Open the app and upload a document with a generic name
  await uploadPage.goto();
  await uploadPage.uploadDocument(path.join(__dirname, '..', 'resources', 'random-doc.pdf'));
  await uploadPage.submit();
  await resultsPage.waitForResults();

  // Verify the document is classified as UNKNOWN
  await resultsPage.expectDocumentType('UNKNOWN');

  // Verify confidence is at least 65%
  const confidenceText = await resultsPage.confidence.textContent();
  const confidence = Number(confidenceText?.replace('%', ''));
  expect(confidence, `Confidence shown was ${confidence}%`).toBeGreaterThanOrEqual(65);
});
