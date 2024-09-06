# API Documentation for Oman Car Hub

This document outlines the API endpoints and their functionality for the Oman Car Hub application.

## Setup

To run this API, you'll need Node.js and Express.js installed. Install the following dependencies:

```bash
npm install express body-parser cors
```

## API Endpoints

### Cars
- `POST /api/cars`: Add a new car
- `GET /api/cars`: Get all cars
- `GET /api/cars/:id`: Get a specific car
- `PUT /api/cars/:id`: Update a specific car
- `DELETE /api/cars/:id`: Delete a specific car

### User Settings
- `GET /api/settings/:userId`: Get settings for a specific user
- `PUT /api/settings/:userId`: Update settings for a specific user

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

## API Implementation

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 443;

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

let cars = [], settings = {}, stats = { currentViewers: 0 }, favorites = [];

const ensureFileExists = (filePath, defaultData) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

["cars.json", "settings.json", "stats.json", "favorites.json"].forEach(file => 
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

function saveData() {
  ["cars", "settings", "stats", "favorites"].forEach(data => 
    fs.writeFileSync(`${data}.json`, JSON.stringify(eval(data), null, 2))
  );
}

// Car endpoints
app.post("/api/cars", (req, res) => {
  const newCar = { ...req.body, id: Date.now() };
  cars.push(newCar);
  saveData();
  res.status(201).json(newCar);
});

app.get("/api/cars", (req, res) => res.json(cars));

app.get("/api/cars/:id", (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  car ? res.json(car) : res.status(404).json({ message: "Car not found" });
});

app.put("/api/cars/:id", (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    cars[index] = { ...cars[index], ...req.body };
    saveData();
    res.json(cars[index]);
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

app.delete("/api/cars/:id", (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    cars.splice(index, 1);
    saveData();
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// User Settings endpoints
app.get("/api/settings/:userId", (req, res) => {
  const userSettings = settings[req.params.userId] || { theme: "light", language: "en" };
  res.json(userSettings);
});

app.put("/api/settings/:userId", (req, res) => {
  settings[req.params.userId] = req.body;
  saveData();
  res.json(settings[req.params.userId]);
});

// Stats endpoints
app.get("/api/stats/currentViewers", (req, res) => res.json({ currentViewers: stats.currentViewers }));

app.post("/api/stats/incrementViewers", (req, res) => {
  stats.currentViewers += 1;
  saveData();
  res.json({ currentViewers: stats.currentViewers });
});

app.post("/api/stats/decrementViewers", (req, res) => {
  stats.currentViewers = Math.max(0, stats.currentViewers - 1);
  saveData();
  res.json({ currentViewers: stats.currentViewers });
});

app.get("/api/stats", (req, res) => {
  const allCars = cars;
  const totalListings = allCars.length;
  const activeSellers = new Set(allCars.map(car => car.seller_id)).size;
  const totalValue = allCars.reduce((sum, car) => sum + car.price, 0);
  const averagePrice = totalListings > 0 ? Math.round(totalValue / totalListings) : 0;
  
  const brandCounts = allCars.reduce((acc, car) => {
    acc[car.make] = (acc[car.make] || 0) + 1;
    return acc;
  }, {});
  const mostPopularBrand = Object.entries(brandCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  const mostExpensiveCar = allCars.reduce((max, car) => max.price > car.price ? max : car, allCars[0]);
  const newestListing = allCars.reduce((newest, car) => newest.id > car.id ? newest : car, allCars[0]);

  res.json({
    totalListings, activeSellers, averagePrice, mostPopularBrand,
    mostExpensiveCar: mostExpensiveCar ? `${mostExpensiveCar.year} ${mostExpensiveCar.make} ${mostExpensiveCar.model}` : "",
    newestListing: newestListing ? `${newestListing.year} ${newestListing.make} ${newestListing.model}` : "",
    latestCar: newestListing,
    currentViewers: stats.currentViewers
  });
});

// Favorites endpoints
app.post("/api/favorites/:carId", (req, res) => {
  const carId = parseInt(req.params.carId);
  const index = favorites.findIndex(f => f.id === carId);
  if (index === -1) {
    favorites.push({ id: carId });
    saveData();
    res.json({ isFavorite: true });
  } else {
    favorites.splice(index, 1);
    saveData();
    res.json({ isFavorite: false });
  }
});

app.get("/api/favorites", (req, res) => {
  const favoriteCars = cars.filter(car => favorites.some(f => f.id === car.id));
  res.json(favoriteCars);
});

app.delete("/api/favorites/:carId", (req, res) => {
  const carId = parseInt(req.params.carId);
  const index = favorites.findIndex(f => f.id === carId);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveData();
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Favorite not found" });
  }
});

app.get("/api/favorites/:carId", (req, res) => {
  const carId = parseInt(req.params.carId);
  const isFavorite = favorites.some(f => f.id === carId);
  res.json({ isFavorite });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`API server running on port ${port}`);
});
```

## Usage

Update your frontend code to make HTTP requests to these endpoints instead of using IndexedDB or localStorage. Ensure to include the user ID when making requests to the settings endpoints.