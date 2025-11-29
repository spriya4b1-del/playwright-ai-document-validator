import { Page, Locator, expect } from '@playwright/test';

export class UploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly analyzeButton: Locator;
  readonly loading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('#docInput');
    this.analyzeButton = page.locator('button[type="submit"]');
    this.loading = page.locator('#loading');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.fileInput).toBeVisible();
  }

  async uploadDocument(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
  }

  async submit() {
    await this.analyzeButton.click();
  }
}
