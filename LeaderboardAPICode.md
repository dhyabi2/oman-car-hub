# Leaderboard API Documentation

## Setup

Ensure you have the following dependencies installed:

```bash
npm install express body-parser cors fs
```

## API Endpoints

### Track Referral

- `POST /api/track-referral`
  - Body: `{ referralKey: string, sourceKey: string }`
  - Description: Tracks a referral, incrementing the count for the referrer

### Get Leaderboard

- `GET /api/leaderboard`
  - Description: Retrieves the leaderboard for today's date

### Get User Name

- `GET /api/user-name/:userId`
  - Description: Retrieves the name associated with a user ID

### Update User Name

- `PUT /api/user-name`
  - Body: `{ referralKey: string, name: string }`
  - Description: Updates the name associated with a referral key

### Get Currently Applied

- `GET /api/currently-applied`
  - Description: Retrieves the list of currently applied users, sorted by points

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

const LEADERBOARD_FILE = 'leaderboard.json';
const USER_NAMES_FILE = 'user_names.json';
const CURRENTLY_APPLIED_FILE = 'currently_applied.json';

// Helper function to ensure JSON files exist
const ensureFileExists = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

ensureFileExists(LEADERBOARD_FILE, {});
ensureFileExists(USER_NAMES_FILE, {});
ensureFileExists(CURRENTLY_APPLIED_FILE, []);

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
  
  // Update currently applied
  const currentlyApplied = JSON.parse(fs.readFileSync(CURRENTLY_APPLIED_FILE, 'utf8'));
  const userIndex = currentlyApplied.findIndex(user => user.referralKey === referralKey);
  
  if (userIndex !== -1) {
    currentlyApplied[userIndex].points++;
  } else {
    currentlyApplied.push({ referralKey, points: 1 });
  }
  
  currentlyApplied.sort((a, b) => b.points - a.points);
  fs.writeFileSync(CURRENTLY_APPLIED_FILE, JSON.stringify(currentlyApplied, null, 2));

  res.json({ success: true });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const date = getTodayDate();
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

// Get user name
app.get('/api/user-name/:userId', (req, res) => {
  const userId = req.params.userId;
  const userNames = JSON.parse(fs.readFileSync(USER_NAMES_FILE, 'utf8'));

  if (!userNames[userId]) {
    userNames[userId] = 'Anonymous';
    fs.writeFileSync(USER_NAMES_FILE, JSON.stringify(userNames, null, 2));
  }

  res.json({ userId: userId, name: userNames[userId] });
});

// Update user name
app.put('/api/user-name', (req, res) => {
  const { referralKey, name } = req.body;
  const userNames = JSON.parse(fs.readFileSync(USER_NAMES_FILE, 'utf8'));
  
  userNames[referralKey] = name;
  fs.writeFileSync(USER_NAMES_FILE, JSON.stringify(userNames, null, 2));
  
  res.json({ success: true });
});

// Get currently applied
app.get('/api/currently-applied', (req, res) => {
  const currentlyApplied = JSON.parse(fs.readFileSync(CURRENTLY_APPLIED_FILE, 'utf8'));
  const userNames = JSON.parse(fs.readFileSync(USER_NAMES_FILE, 'utf8'));

  const currentlyAppliedWithNames = currentlyApplied.map(entry => ({
    ...entry,
    name: userNames[entry.referralKey] || 'Anonymous'
  }));

  res.json(currentlyAppliedWithNames);
});

app.listen(port, () => {
  console.log(`Leaderboard API running on port ${port}`);
});
```

## Usage

1. Start the API server.
2. Use these endpoints in your frontend application to track referrals, retrieve the leaderboard and currently applied users, and update user names.
3. Ensure to include both the referral key and a unique source key when tracking referrals to prevent manipulation.