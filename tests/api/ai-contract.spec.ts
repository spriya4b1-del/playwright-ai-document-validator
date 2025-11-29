import { test, expect, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('AI /api/analyze contract', () => {
  test('should return a valid analysis response for a document', async () => {
    const apiRequest = await request.newContext({
      baseURL: 'http://localhost:3000'
    });

    // Build absolute path to the file
    const filePath = path.join(__dirname, '..', 'resources', 'sample-invoice.pdf');
    const fileBuffer = fs.readFileSync(filePath);

    const response = await apiRequest.post('/api/analyze', {
      multipart: {
        document: {
          name: 'sample-invoice.pdf',
          mimeType: 'application/pdf',
          buffer: fileBuffer
        }
      }
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    // Basic schema checks
    expect(body).toHaveProperty('fileName');
    expect(body).toHaveProperty('documentType');
    expect(body).toHaveProperty('confidence');
    expect(body).toHaveProperty('extractedText');
    expect(body).toHaveProperty('fields');
    expect(body.fields).toHaveProperty('name');
    expect(body).toHaveProperty('aiModel');
    expect(body).toHaveProperty('ocrEngine');
    expect(body).toHaveProperty('safetyChecks');
  });
});
