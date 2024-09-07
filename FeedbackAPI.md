# Feedback API Documentation

## Setup

Ensure you have the following dependencies installed:

```bash
npm install express body-parser cors fs
```

## API Endpoint

### Submit Feedback

- `POST /api/submit-feedback`
  - Body: `{ feedback: string, language: string }`
  - Description: Stores the submitted feedback in a JSON file

## API Implementation

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const FEEDBACK_FILE = 'feedback.json';

// Helper function to ensure JSON file exists
const ensureFileExists = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

ensureFileExists(FEEDBACK_FILE, []);

// Submit feedback
app.post('/api/submit-feedback', (req, res) => {
  const { feedback, language } = req.body;
  
  if (!feedback || !language) {
    return res.status(400).json({ error: 'Feedback and language are required' });
  }

  const feedbackData = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
  
  feedbackData.push({
    feedback,
    language,
    timestamp: new Date().toISOString()
  });

  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackData, null, 2));
  
  res.json({ success: true, message: 'Feedback submitted successfully' });
});

app.listen(port, () => {
  console.log(`Feedback API running on port ${port}`);
});
```

## Usage

1. Start the API server.
2. Use this endpoint in your frontend application to submit feedback.
3. Ensure to include both the feedback text and the language when making requests.