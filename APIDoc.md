# API Documentation for Oman Car Hub

This document outlines the API endpoints and their functionality for the Oman Car Hub application. The API is designed to replace the current local storage and IndexedDB setup.

## Setup

To run this API, you'll need Node.js and Express.js installed. You'll also need to install the following dependencies:

```bash
npm install express body-parser cors
```

## API Script

Here's the complete Node.js script for the API:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with a database in production)
let cars = [];
let settings = {};
let stats = { currentViewers: 0 };
let favorites = [];

// Load initial data from JSON files
try {
  cars = JSON.parse(fs.readFileSync('cars.json', 'utf8'));
  settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
  stats = JSON.parse(fs.readFileSync('stats.json', 'utf8'));
  favorites = JSON.parse(fs.readFileSync('favorites.json', 'utf8'));
} catch (error) {
  console.error('Error loading initial data:', error);
}

// Helper function to save data to JSON files
function saveData() {
  fs.writeFileSync('cars.json', JSON.stringify(cars));
  fs.writeFileSync('settings.json', JSON.stringify(settings));
  fs.writeFileSync('stats.json', JSON.stringify(stats));
  fs.writeFileSync('favorites.json', JSON.stringify(favorites));
}

// Car endpoints
app.post('/api/cars', (req, res) => {
  const newCar = { ...req.body, id: Date.now() };
  cars.push(newCar);
  saveData();
  res.status(201).json(newCar);
});

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

app.put('/api/cars/:id', (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    cars[index] = { ...cars[index], ...req.body };
    saveData();
    res.json(cars[index]);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

app.delete('/api/cars/:id', (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    cars.splice(index, 1);
    saveData();
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Settings endpoints
app.get('/api/settings/:key', (req, res) => {
  const value = settings[req.params.key];
  if (value !== undefined) {
    res.json({ value });
  } else {
    res.status(404).json({ message: 'Setting not found' });
  }
});

app.put('/api/settings/:key', (req, res) => {
  settings[req.params.key] = req.body.value;
  saveData();
  res.json({ key: req.params.key, value: req.body.value });
});

// Stats endpoints
app.get('/api/stats/currentViewers', (req, res) => {
  res.json({ currentViewers: stats.currentViewers });
});

app.post('/api/stats/incrementViewers', (req, res) => {
  stats.currentViewers += 1;
  saveData();
  res.json({ currentViewers: stats.currentViewers });
});

app.post('/api/stats/decrementViewers', (req, res) => {
  stats.currentViewers = Math.max(0, stats.currentViewers - 1);
  saveData();
  res.json({ currentViewers: stats.currentViewers });
});

app.get('/api/stats', (req, res) => {
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

  const statistics = {
    totalListings,
    activeSellers,
    averagePrice,
    mostPopularBrand,
    mostExpensiveCar: mostExpensiveCar ? `${mostExpensiveCar.year} ${mostExpensiveCar.make} ${mostExpensiveCar.model}` : '',
    newestListing: newestListing ? `${newestListing.year} ${newestListing.make} ${newestListing.model}` : '',
    latestCar: newestListing,
    currentViewers: stats.currentViewers
  };

  res.json(statistics);
});

// Favorites endpoints
app.post('/api/favorites/:carId', (req, res) => {
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

app.get('/api/favorites', (req, res) => {
  const favoriteCars = cars.filter(car => favorites.some(f => f.id === car.id));
  res.json(favoriteCars);
});

app.delete('/api/favorites/:carId', (req, res) => {
  const carId = parseInt(req.params.carId);
  const index = favorites.findIndex(f => f.id === carId);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveData();
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Favorite not found' });
  }
});

app.get('/api/favorites/:carId', (req, res) => {
  const carId = parseInt(req.params.carId);
  const isFavorite = favorites.some(f => f.id === carId);
  res.json({ isFavorite });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
```

## API Endpoints

### Cars

- `POST /api/cars`: Add a new car
- `GET /api/cars`: Get all cars
- `GET /api/cars/:id`: Get a specific car by ID
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

To use this API, you'll need to update your frontend code to make HTTP requests to these endpoints instead of using IndexedDB or localStorage. You can use the `fetch` API or a library like Axios to make these requests.

For example, to get all cars:

```javascript
fetch('http://localhost:3000/api/cars')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Remember to handle errors and loading states in your frontend application when making API calls.