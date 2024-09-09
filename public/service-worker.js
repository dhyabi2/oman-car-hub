const CACHE_NAME = 'oman-auto-mart-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512x512.png',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-cars') {
    event.waitUntil(syncCars());
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-car-listings') {
    event.waitUntil(updateCarListings());
  }
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon-512x512.png',
    badge: '/icon-512x512.png'
  };

  event.waitUntil(
    self.registration.showNotification('Oman Auto Mart', options)
  );
});

async function syncCars() {
  // Implement car data synchronization logic here
}

async function updateCarListings() {
  // Implement periodic car listings update logic here
}