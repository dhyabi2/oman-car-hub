import { openDB } from 'idb';

const dbName = 'CarDatabase';
const carStoreName = 'cars';
const settingsStoreName = 'settings';
const version = 2;

async function initDB() {
  return openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      if (!db.objectStoreNames.contains(carStoreName)) {
        db.createObjectStore(carStoreName, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(settingsStoreName)) {
        db.createObjectStore(settingsStoreName, { keyPath: 'key' });
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