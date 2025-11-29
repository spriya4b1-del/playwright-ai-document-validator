import { test } from '@playwright/test';
import path from 'path';
import { UploadPage } from '../../src/pages/upload.page';
import { ResultsPage } from '../../src/pages/results.page';

test.describe('AI Document Validator - UNKNOWN type', () => {
  test('document with generic name should be classified as UNKNOWN', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const resultsPage = new ResultsPage(page);

    await uploadPage.goto();

    const filePath = path.join(__dirname, '..', 'resources', 'random-doc.pdf');
    await uploadPage.uploadDocument(filePath);

    await uploadPage.submit();
    await resultsPage.waitForResults();

    await resultsPage.expectDocumentType('UNKNOWN');
    await resultsPage.expectConfidenceAtLeast(50);
  });
});
