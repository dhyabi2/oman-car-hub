const CACHE_NAME = 'oman-auto-mart-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-512x512.png'
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
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
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

async function syncData() {
  // Implement data synchronization logic here
}

async function updateContent() {
  // Implement content update logic here
}