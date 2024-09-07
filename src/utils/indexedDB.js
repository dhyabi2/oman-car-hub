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
    // If it's a network error, try to use local storage as fallback
    if (error.message === 'Failed to fetch') {
      return useLocalStorageFallback(endpoint, method, body);
    }
    throw new Error(`API request failed: ${error.message}`);
  }
}

function useLocalStorageFallback(endpoint, method, body) {
  const key = `fallback_${endpoint}`;
  if (method === 'GET') {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } else if (method === 'POST' || method === 'PUT') {
    const existingData = localStorage.getItem(key);
    const dataArray = existingData ? JSON.parse(existingData) : [];
    if (body.id) {
      const index = dataArray.findIndex(item => item.id === body.id);
      if (index !== -1) {
        dataArray[index] = body;
      } else {
        dataArray.push(body);
      }
    } else {
      body.id = Date.now(); // Generate a temporary ID
      dataArray.push(body);
    }
    localStorage.setItem(key, JSON.stringify(dataArray));
    return body;
  } else if (method === 'DELETE') {
    const existingData = localStorage.getItem(key);
    if (existingData) {
      const dataArray = JSON.parse(existingData);
      const updatedArray = dataArray.filter(item => item.id !== body.id);
      localStorage.setItem(key, JSON.stringify(updatedArray));
    }
    return { success: true };
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
    return localStorage.getItem('language') || 'en';
  }
}

export async function setLanguage(language) {
  try {
    await apiRequest('/api/settings/language', 'PUT', { value: language });
    localStorage.setItem('language', language);
  } catch (error) {
    console.error('Failed to set language:', error);
    localStorage.setItem('language', language);
  }
}

export async function getTheme() {
  try {
    const result = await apiRequest('/api/settings/theme');
    return result.value;
  } catch (error) {
    console.error('Failed to get theme:', error);
    return localStorage.getItem('theme') || 'light';
  }
}

export async function setTheme(theme) {
  try {
    await apiRequest('/api/settings/theme', 'PUT', { value: theme });
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Failed to set theme:', error);
    localStorage.setItem('theme', theme);
  }
}

export async function incrementCurrentViewers() {
  try {
    return await apiRequest('/api/stats/incrementViewers', 'POST');
  } catch (error) {
    console.error('Failed to increment viewers:', error);
    const currentViewers = parseInt(localStorage.getItem('currentViewers') || '0');
    localStorage.setItem('currentViewers', (currentViewers + 1).toString());
    return { currentViewers: currentViewers + 1 };
  }
}

export async function decrementCurrentViewers() {
  try {
    return await apiRequest('/api/stats/decrementViewers', 'POST');
  } catch (error) {
    console.error('Failed to decrement viewers:', error);
    const currentViewers = Math.max(0, parseInt(localStorage.getItem('currentViewers') || '0') - 1);
    localStorage.setItem('currentViewers', currentViewers.toString());
    return { currentViewers };
  }
}

export async function getCurrentViewers() {
  try {
    const result = await apiRequest('/api/stats/currentViewers');
    return result.currentViewers;
  } catch (error) {
    console.error('Failed to get current viewers:', error);
    return parseInt(localStorage.getItem('currentViewers') || '0');
  }
}

export async function getCarStatistics() {
  try {
    return await apiRequest('/api/stats');
  } catch (error) {
    console.error('Failed to get car statistics:', error);
    return {
      totalListings: parseInt(localStorage.getItem('totalListings') || '0'),
      activeSellers: parseInt(localStorage.getItem('activeSellers') || '0'),
      averagePrice: parseInt(localStorage.getItem('averagePrice') || '0'),
      mostPopularBrand: localStorage.getItem('mostPopularBrand') || '',
      mostExpensiveCar: localStorage.getItem('mostExpensiveCar') || '',
      newestListing: localStorage.getItem('newestListing') || '',
      currentViewers: parseInt(localStorage.getItem('currentViewers') || '0')
    };
  }
}

export async function toggleFavoriteCar(carId) {
  try {
    const result = await apiRequest(`/api/favorites/${carId}`, 'POST');
    return result.isFavorite;
  } catch (error) {
    console.error('Failed to toggle favorite car:', error);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(carId);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== carId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(carId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    return !isFavorite;
  }
}

export async function getFavoriteCars() {
  try {
    return await apiRequest('/api/favorites');
  } catch (error) {
    console.error('Failed to get favorite cars:', error);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const cars = JSON.parse(localStorage.getItem('fallback_/api/cars') || '[]');
    return cars.filter(car => favorites.includes(car.id));
  }
}

export async function removeFavoriteCar(carId) {
  try {
    return await apiRequest(`/api/favorites/${carId}`, 'DELETE');
  } catch (error) {
    console.error('Failed to remove favorite car:', error);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(id => id !== carId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { success: true };
  }
}

export async function isFavoriteCar(carId) {
  try {
    const result = await apiRequest(`/api/favorites/${carId}`);
    return result.isFavorite;
  } catch (error) {
    console.error('Failed to check if car is favorite:', error);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(carId);
  }
}