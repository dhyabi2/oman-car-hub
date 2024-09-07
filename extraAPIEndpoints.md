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

## Generate Source Key

### Endpoint: `/api/generate-source-key`

This endpoint generates a new source key based on the user's IP address provided by the frontend.

#### Method: POST

#### Request Body:
```json
{
  "ip": "string"
}
```

#### Response:
- 200 OK: Returns a new or existing source key
- 400 Bad Request: If there's an error generating the source key

#### Implementation:

```javascript
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const sourceKeysFile = path.join(__dirname, 'sourceKeys.json');

// Ensure the sourceKeys.json file exists
if (!fs.existsSync(sourceKeysFile)) {
  fs.writeFileSync(sourceKeysFile, JSON.stringify({}));
}

// Load source keys from file
let sourceKeys = JSON.parse(fs.readFileSync(sourceKeysFile, 'utf8'));

// Middleware to check if a source key is valid
const isValidSourceKey = (req, res, next) => {
  const { sourceKey } = req.body;
  if (!sourceKey) {
    return res.status(400).json({ error: 'Source key is required' });
  }
  if (!sourceKeys[sourceKey]) {
    return res.status(400).json({ error: 'Invalid source key' });
  }
  next();
};

// Endpoint to check if a source key is valid
router.post('/check-source-key', isValidSourceKey, (req, res) => {
  res.status(200).json({ message: 'Valid source key' });
});

// Helper function to generate a new source key
const generateSourceKey = (ip) => {
  const newSourceKey = Math.random().toString(36).substring(2, 15);
  sourceKeys[newSourceKey] = ip;
  fs.writeFileSync(sourceKeysFile, JSON.stringify(sourceKeys, null, 2));
  return newSourceKey;
};

// Endpoint to generate a new source key based on IP
router.post('/generate-source-key', (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  try {
    // Check if IP already has a source key
    for (const [key, value] of Object.entries(sourceKeys)) {
      if (value === ip) {
        return res.status(200).json({ sourceKey: key });
      }
    }

    // Generate new source key if IP is not found
    const newSourceKey = generateSourceKey(ip);
    res.status(200).json({ sourceKey: newSourceKey });
  } catch (error) {
    console.error('Error generating source key:', error);
    res.status(400).json({ error: 'Failed to generate source key' });
  }
});

module.exports = router;
```

To use these endpoints:

1. Include this router in your main Express app:
   ```javascript
   const extraEndpoints = require('./extraEndpoints');
   app.use('/api', extraEndpoints);
   ```

2. In your frontend, first fetch the IP address, then call the `/api/generate-source-key` endpoint:
   ```javascript
   fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {
       const ip = data.ip;
       return fetch('/api/generate-source-key', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ip }),
       });
     })
     .then(response => response.json())
     .then(data => {
       localStorage.setItem('sourceKey', data.sourceKey);
     })
     .catch(error => console.error('Error fetching IP or generating source key:', error));
   ```

3. When tracking referrals, first call `/api/check-source-key` to validate the source key before proceeding with the referral tracking logic.

Note: In a production environment, consider using a database instead of a JSON file for storing source keys. Also, implement proper security measures such as rate limiting and encryption for the source keys.