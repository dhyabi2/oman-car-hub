// Latest modification: Added comment line for latest modification

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

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(`API request failed: ${error.message}`);
  }
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
  try {
    const result = await apiRequest('/api/settings/language');
    return result.value;
  } catch (error) {
    console.error('Failed to get language:', error);
    return 'en'; // Default to English if there's an error
  }
}

export async function setLanguage(language) {
  return apiRequest('/api/settings/language', 'PUT', { value: language });
}

export async function getTheme() {
  try {
    const result = await apiRequest('/api/settings/theme');
    return result.value;
  } catch (error) {
    console.error('Failed to get theme:', error);
    return 'light'; // Default to light theme if there's an error
  }
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
  try {
    const result = await apiRequest('/api/stats/currentViewers');
    return result.currentViewers;
  } catch (error) {
    console.error('Failed to get current viewers:', error);
    return 0; // Default to 0 if there's an error
  }
}

export async function getCarStatistics() {
  try {
    return await apiRequest('/api/stats');
  } catch (error) {
    console.error('Failed to get car statistics:', error);
    return {
      totalListings: 0,
      activeSellers: 0,
      averagePrice: 0,
      mostPopularBrand: '',
      mostExpensiveCar: '',
      newestListing: '',
      currentViewers: 0
    };
  }
}

export async function toggleFavoriteCar(carId) {
  try {
    const result = await apiRequest(`/api/favorites/${carId}`, 'POST');
    return result.isFavorite;
  } catch (error) {
    console.error('Failed to toggle favorite car:', error);
    return false;
  }
}

export async function getFavoriteCars() {
  try {
    return await apiRequest('/api/favorites');
  } catch (error) {
    console.error('Failed to get favorite cars:', error);
    return [];
  }
}

export async function removeFavoriteCar(carId) {
  return apiRequest(`/api/favorites/${carId}`, 'DELETE');
}

export async function isFavoriteCar(carId) {
  try {
    const result = await apiRequest(`/api/favorites/${carId}`);
    return result.isFavorite;
  } catch (error) {
    console.error('Failed to check if car is favorite:', error);
    return false;
  }
}