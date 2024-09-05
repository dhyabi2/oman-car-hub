import { openDB } from 'idb';

const dbName = 'CarDatabase';
const carStoreName = 'cars';
const settingsStoreName = 'settings';
const statsStoreName = 'stats';
const version = 3;

async function initDB() {
  return openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(carStoreName)) {
        db.createObjectStore(carStoreName, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(settingsStoreName)) {
        db.createObjectStore(settingsStoreName, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(statsStoreName)) {
        db.createObjectStore(statsStoreName, { keyPath: 'key' });
      }
    },
  });
}

export async function addCar(car) {
  const db = await initDB();
  return db.add(carStoreName, car);
}

export async function getAllCars() {
  const db = await initDB();
  return db.getAll(carStoreName);
}

export async function getCarById(id) {
  const db = await initDB();
  return db.get(carStoreName, id);
}

export async function updateCar(car) {
  const db = await initDB();
  return db.put(carStoreName, car);
}

export async function deleteCar(id) {
  const db = await initDB();
  return db.delete(carStoreName, id);
}

export async function getLanguage() {
  const db = await initDB();
  const result = await db.get(settingsStoreName, 'language');
  return result ? result.value : 'en';
}

export async function setLanguage(language) {
  const db = await initDB();
  return db.put(settingsStoreName, { key: 'language', value: language });
}

export async function getTheme() {
  const db = await initDB();
  const result = await db.get(settingsStoreName, 'theme');
  return result ? result.value : 'light';
}

export async function setTheme(theme) {
  const db = await initDB();
  return db.put(settingsStoreName, { key: 'theme', value: theme });
}

export async function incrementCurrentViewers() {
  const db = await initDB();
  const tx = db.transaction(statsStoreName, 'readwrite');
  const store = tx.objectStore(statsStoreName);
  const currentViewers = await store.get('currentViewers') || { key: 'currentViewers', value: 0 };
  currentViewers.value += 1;
  await store.put(currentViewers);
  return currentViewers.value;
}

export async function decrementCurrentViewers() {
  const db = await initDB();
  const tx = db.transaction(statsStoreName, 'readwrite');
  const store = tx.objectStore(statsStoreName);
  const currentViewers = await store.get('currentViewers') || { key: 'currentViewers', value: 0 };
  currentViewers.value = Math.max(0, currentViewers.value - 1);
  await store.put(currentViewers);
  return currentViewers.value;
}

export async function getCurrentViewers() {
  const db = await initDB();
  const result = await db.get(statsStoreName, 'currentViewers');
  return result ? result.value : 0;
}

export async function getCarStatistics() {
  const allCars = await getAllCars();
  
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
  
  const currentViewers = await getCurrentViewers();
  
  return {
    totalListings,
    activeSellers,
    averagePrice,
    mostPopularBrand,
    mostExpensiveCar: mostExpensiveCar ? `${mostExpensiveCar.year} ${mostExpensiveCar.make} ${mostExpensiveCar.model}` : '',
    newestListing: newestListing ? `${newestListing.year} ${newestListing.make} ${newestListing.model}` : '',
    latestCar: newestListing,
    currentViewers
  };
}