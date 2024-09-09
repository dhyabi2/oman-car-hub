importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'script' || request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith('/api/'),
  new workbox.strategies.NetworkFirst()
);

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

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://omanautomart.com')
  );
});

async function syncCars() {
  const cache = await caches.open('car-listings');
  const cachedRequests = await cache.keys();
  const responses = await Promise.all(cachedRequests.map(request => fetch(request)));
  await Promise.all(responses.map(response => cache.put(response.url, response)));
}

async function updateCarListings() {
  const response = await fetch('/api/cars');
  const cars = await response.json();
  const cache = await caches.open('car-listings');
  await cache.put('/api/cars', new Response(JSON.stringify(cars)));
}

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);