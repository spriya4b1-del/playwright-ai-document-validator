import { Page, Locator, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;
  readonly resultsContainer: Locator;
  readonly fileName: Locator;
  readonly docType: Locator;
  readonly confidence: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsContainer = page.locator('#results');
    this.fileName = page.locator('#fileName');
    this.docType = page.locator('#docType');
    this.confidence = page.locator('#confidence');
  }

  async waitForResults() {
    await this.resultsContainer.waitFor({ state: 'visible' });
  }

  async expectFileNameContains(expected: string) {
    await expect(this.fileName).toContainText(expected);
  }

  async expectDocumentType(expectedType: string) {
    await expect(this.docType).toHaveText(expectedType);
  }

  async expectConfidenceAtLeast(minPercent: number) {
    const text = await this.confidence.textContent();
    const numeric = Number(text?.replace('%', '') || 0);
    await expect(numeric).toBeGreaterThanOrEqual(minPercent);
  }
}
