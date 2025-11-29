const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Mock AI/OCR endpoint
app.post('/api/analyze', upload.single('document'), (req, res) => {
  const fileName = req.file?.originalname || 'unknown.pdf';

  // Very simple logic: detect document type by file name
  const isInvoice = /invoice/i.test(fileName);
  const isContract = /contract/i.test(fileName);

  const documentType = isInvoice ? 'INVOICE' : isContract ? 'CONTRACT' : 'UNKNOWN';
  const confidence = documentType === 'UNKNOWN' ? 0.65 : 0.92;

  res.json({
    fileName,
    documentType,
    confidence,
    extractedText: `Mock text extracted from ${fileName}.`,
    fields: {
      name: "John Doe",
      amount: isInvoice ? "1250.00" : null,
      date: "2025-01-01"
    },
    aiModel: "mock-llm-001",
    ocrEngine: "mock-ocr-1.0",
    safetyChecks: {
      piiDetected: true,
      piiRedacted: true
    }
  });
});

// App health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Doc Validator running at http://localhost:${PORT}`);
});
