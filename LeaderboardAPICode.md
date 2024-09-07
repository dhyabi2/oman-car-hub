# Leaderboard API Documentation

## Setup

Ensure you have the following dependencies installed:

```bash
npm install express body-parser cors uuid
```

## API Endpoints

### Track Referral

- `POST /api/track-referral`
  - Body: `{ referralKey: string, sourceKey: string }`
  - Description: Tracks a referral, incrementing the count for the referrer

### Get Leaderboard

- `GET /api/leaderboard`
  - Query Parameters: 
    - `date`: string (optional, defaults to today's date)
  - Description: Retrieves the leaderboard for a specific date

### Update User Name

- `PUT /api/user-name`
  - Body: `{ referralKey: string, name: string }`
  - Description: Updates the name associated with a referral key

## API Implementation

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const LEADERBOARD_FILE = 'leaderboard.json';
const USER_NAMES_FILE = 'user_names.json';

// Helper function to ensure JSON files exist
const ensureFileExists = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

ensureFileExists(LEADERBOARD_FILE, {});
ensureFileExists(USER_NAMES_FILE, {});

// Helper function to get today's date as a string
const getTodayDate = () => new Date().toISOString().split('T')[0];

// Track referral
app.post('/api/track-referral', (req, res) => {
  const { referralKey, sourceKey } = req.body;
  const today = getTodayDate();

  const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf8'));
  
  if (!leaderboard[today]) {
    leaderboard[today] = {};
  }

  if (!leaderboard[today][referralKey]) {
    leaderboard[today][referralKey] = { count: 0, sources: {} };
  }

  if (!leaderboard[today][referralKey].sources[sourceKey]) {
    leaderboard[today][referralKey].count++;
    leaderboard[today][referralKey].sources[sourceKey] = true;
  }

  fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(leaderboard, null, 2));
  res.json({ success: true });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const date = req.query.date || getTodayDate();
  const leaderboard = JSON.parse(fs.readFileSync(LEADERBOARD_FILE, 'utf8'));
  const userNames = JSON.parse(fs.readFileSync(USER_NAMES_FILE, 'utf8'));

  const dateLeaderboard = leaderboard[date] || {};
  const sortedLeaderboard = Object.entries(dateLeaderboard)
    .map(([key, value]) => ({
      referralKey: key,
      name: userNames[key] || 'Anonymous',
      count: value.count
    }))
    .sort((a, b) => b.count - a.count);

  res.json(sortedLeaderboard);
});

// Update user name
app.put('/api/user-name', (req, res) => {
  const { referralKey, name } = req.body;
  const userNames = JSON.parse(fs.readFileSync(USER_NAMES_FILE, 'utf8'));
  
  userNames[referralKey] = name;
  fs.writeFileSync(USER_NAMES_FILE, JSON.stringify(userNames, null, 2));
  
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Leaderboard API running on port ${port}`);
});
```

## Usage

1. Start the API server.
2. Use these endpoints in your frontend application to track referrals, retrieve the leaderboard, and update user names.
3. Ensure to include both the referral key and a unique source key when tracking referrals to prevent manipulation.