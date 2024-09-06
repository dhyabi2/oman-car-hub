const API_BASE_URL = 'https://oman-car-hub.replit.app';

async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

export async function addCar(car) {
  return apiRequest('/api/cars', 'POST', car);
}

export async function getAllCars() {
  return apiRequest('/api/cars');
}

export async function getCarById(id) {
  return apiRequest(`/api/cars/${id}`);
}

export async function updateCar(car) {
  return apiRequest(`/api/cars/${car.id}`, 'PUT', car);
}

export async function deleteCar(id) {
  return apiRequest(`/api/cars/${id}`, 'DELETE');
}

export async function getLanguage() {
  const result = await apiRequest('/api/settings/language');
  return result.value;
}

export async function setLanguage(language) {
  return apiRequest('/api/settings/language', 'PUT', { value: language });
}

export async function getTheme() {
  const result = await apiRequest('/api/settings/theme');
  return result.value;
}

export async function setTheme(theme) {
  return apiRequest('/api/settings/theme', 'PUT', { value: theme });
}

export async function incrementCurrentViewers() {
  return apiRequest('/api/stats/incrementViewers', 'POST');
}

export async function decrementCurrentViewers() {
  return apiRequest('/api/stats/decrementViewers', 'POST');
}

export async function getCurrentViewers() {
  const result = await apiRequest('/api/stats/currentViewers');
  return result.currentViewers;
}

export async function getCarStatistics() {
  return apiRequest('/api/stats');
}

export async function toggleFavoriteCar(carId) {
  const result = await apiRequest(`/api/favorites/${carId}`, 'POST');
  return result.isFavorite;
}

export async function getFavoriteCars() {
  return apiRequest('/api/favorites');
}

export async function removeFavoriteCar(carId) {
  return apiRequest(`/api/favorites/${carId}`, 'DELETE');
}

export async function isFavoriteCar(carId) {
  const result = await apiRequest(`/api/favorites/${carId}`);
  return result.isFavorite;
}