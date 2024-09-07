# API Documentation for Oman Car Hub

This document outlines the API endpoints and their functionality for the Oman Car Hub application.

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

### Referrals
- `POST /api/generate-source-key`: Generate a source key and track referral
  - Body: `{ ip: string, referralCode: string }`
  - Description: Generates a source key based on IP and tracks the referral
- `GET /api/leaderboard`: Get the referral leaderboard
- `GET /api/user-name/:userId`: Get the name for a user ID
- `PUT /api/user-name`: Update the name for a user
  - Body: `{ referralKey: string, name: string }`

## API Implementation

The API is implemented using Express.js. Ensure proper error handling and input validation for all endpoints.

## Usage

Update your frontend code to make HTTP requests to these endpoints. Include error handling and loading states in your UI.