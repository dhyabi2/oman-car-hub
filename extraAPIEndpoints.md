# Extra API Endpoints

## Check Source Key

### Endpoint: `/api/check-source-key`

This endpoint is used to validate the source key before tracking referrals.

#### Method: POST

#### Request Body:
```json
{
  "sourceKey": "string"
}
```

#### Response:
- 200 OK: If the source key is valid
- 400 Bad Request: If the source key is invalid or missing

#### Implementation:

```javascript
const express = require('express');
const router = express.Router();

// In-memory storage for valid source keys (replace with database in production)
const validSourceKeys = new Set();

// Middleware to check if a source key is valid
const isValidSourceKey = (req, res, next) => {
  const { sourceKey } = req.body;
  if (!sourceKey) {
    return res.status(400).json({ error: 'Source key is required' });
  }
  if (!validSourceKeys.has(sourceKey)) {
    return res.status(400).json({ error: 'Invalid source key' });
  }
  next();
};

// Endpoint to check if a source key is valid
router.post('/check-source-key', isValidSourceKey, (req, res) => {
  res.status(200).json({ message: 'Valid source key' });
});

// Helper function to generate and store a new valid source key
const generateSourceKey = () => {
  const newSourceKey = Math.random().toString(36).substring(2, 15);
  validSourceKeys.add(newSourceKey);
  return newSourceKey;
};

// Endpoint to generate a new source key (for demonstration purposes)
router.get('/generate-source-key', (req, res) => {
  const newSourceKey = generateSourceKey();
  res.status(200).json({ sourceKey: newSourceKey });
});

module.exports = router;
```

To use these endpoints:

1. Include this router in your main Express app:
   ```javascript
   const extraEndpoints = require('./extraEndpoints');
   app.use('/api', extraEndpoints);
   ```

2. When a user first accesses the app, generate a source key for them using the `/api/generate-source-key` endpoint.

3. Store this source key in the user's local storage or as a cookie.

4. When tracking referrals, first call `/api/check-source-key` to validate the source key before proceeding with the referral tracking logic.

Note: In a production environment, you should replace the in-memory storage with a database solution for storing valid source keys. Also, implement proper security measures such as rate limiting and user authentication for generating source keys.