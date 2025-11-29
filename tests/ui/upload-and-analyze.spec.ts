import { test } from '@playwright/test';
import { UploadPage } from '../../src/pages/upload.page';
import { ResultsPage } from '../../src/pages/results.page';

test.describe('AI Document Validator - UI flow', () => {
  test('user can upload an invoice and see AI analysis', async ({ page }) => {
    const uploadPage = new UploadPage(page);
    const resultsPage = new ResultsPage(page);

    // Go to the app
    await uploadPage.goto();

    // Upload our sample invoice PDF
    await uploadPage.uploadDocument('tests/resources/sample-invoice.pdf');

    // Click "Analyze with AI"
    await uploadPage.submit();

    // Wait for results to appear
    await resultsPage.waitForResults();

    // Assertions
    await resultsPage.expectFileNameContains('sample-invoice.pdf');
    await resultsPage.expectDocumentType('INVOICE');
    await resultsPage.expectConfidenceAtLeast(80);
  });
});

