import { openDB } from 'idb';

const dbName = 'CarDatabase';
const storeName = 'cars';
const version = 1;

async function initDB() {
  return openDB(dbName, version, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function addCar(car) {
  const db = await initDB();
  return db.add(storeName, car);
}

export async function getAllCars() {
  const db = await initDB();
  return db.getAll(storeName);
}

export async function getCarById(id) {
  const db = await initDB();
  return db.get(storeName, id);
}

export async function updateCar(car) {
  const db = await initDB();
  return db.put(storeName, car);
}

export async function deleteCar(id) {
  const db = await initDB();
  return db.delete(storeName, id);
}