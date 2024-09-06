# API Documentation for Oman Car Hub

This document outlines the API endpoints and their functionality for the Oman Car Hub application.

## API Script

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const port = 443;

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

let cars = [], settings = {}, stats = { currentViewers: 0 }, favorites = [], userSessions = {};

const ensureFileExists = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

["cars.json", "settings.json", "stats.json", "favorites.json", "userSessions.json"].forEach(file => 
  ensureFileExists(file, file === "stats.json" ? { currentViewers: 0 } : (file === "settings.json" ? {} : []))
);

const loadData = (filePath, defaultData) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    return defaultData;
  }
};

cars = loadData("cars.json", []);
settings = loadData("settings.json", {});
stats = loadData("stats.json", { currentViewers: 0 });
favorites = loadData("favorites.json", []);
userSessions = loadData("userSessions.json", {});

function saveData() {
  ["cars", "settings", "stats", "favorites", "userSessions"].forEach(data => 
    fs.writeFileSync(`${data}.json`, JSON.stringify(eval(data), null, 2))
  );
}

function generateSessionKey() {
  return crypto.randomBytes(16).toString("hex");
}

app.post("/api/session", (req, res) => {
  const sessionKey = generateSessionKey();
  userSessions[sessionKey] = { theme: "light", language: "en" };
  saveData();
  res.json({ sessionKey });
});

app.get("/api/session/:sessionKey", (req, res) => {
  const { sessionKey } = req.params;
  if (userSessions[sessionKey]) {
    res.json(userSessions[sessionKey]);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

app.put("/api/session/:sessionKey", (req, res) => {
  const { sessionKey } = req.params;
  const { theme, language } = req.body;
  if (userSessions[sessionKey]) {
    userSessions[sessionKey] = { ...userSessions[sessionKey], theme, language };
    saveData();
    res.json(userSessions[sessionKey]);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

// Existing endpoints remain unchanged

app.listen(port, "0.0.0.0", () => {
  console.log(`API server running on port ${port}`);
});
```

## API Endpoints

### Session Management
- `POST /api/session`: Create a new session
- `GET /api/session/:sessionKey`: Get session data
- `PUT /api/session/:sessionKey`: Update session data

### Cars
- `POST /api/cars`: Add a new car
- `GET /api/cars`: Get all cars
- `GET /api/cars/:id`: Get a specific car
- `PUT /api/cars/:id`: Update a specific car
- `DELETE /api/cars/:id`: Delete a specific car

### Settings
- `GET /api/settings/:key`: Get a specific setting
- `PUT /api/settings/:key`: Update a specific setting

### Stats
- `GET /api/stats/currentViewers`: Get current viewers count
- `POST /api/stats/incrementViewers`: Increment viewers count
- `POST /api/stats/decrementViewers`: Decrement viewers count
- `GET /api/stats`: Get all statistics

### Favorites
- `POST /api/favorites/:carId`: Toggle favorite status for a car
- `GET /api/favorites`: Get all favorite cars
- `DELETE /api/favorites/:carId`: Remove a car from favorites
- `GET /api/favorites/:carId`: Check if a car is favorited

## Usage

Update your frontend code to make HTTP requests to these endpoints instead of using IndexedDB or localStorage. Use the session management endpoints to store and retrieve user preferences.