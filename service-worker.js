// Define un nombre y una versión para la caché
const CACHE_NAME = 'budget-calculator-cache-v1';
// Lista de archivos que se guardarán en la caché para que la app funcione offline
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/logo.svg',
  '/assets/logo-192x192.png',
  '/assets/logo-512x512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Evento 'install': se dispara cuando el service worker se instala por primera vez.
self.addEventListener('install', event => {
  // Espera a que la promesa se resuelva antes de continuar.
  event.waitUntil(
    // Abre la caché con el nombre que definimos.
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierta');
        // Añade todos los archivos de nuestra lista a la caché.
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': se dispara cada vez que la página solicita un recurso (una imagen, un script, etc.).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Comprueba si el recurso solicitado ya está en la caché.
    caches.match(event.request)
      .then(response => {
        // Si encontramos el recurso en la caché, lo devolvemos.
        if (response) {
          return response;
        }
        // Si no está en la caché, vamos a la red a buscarlo.
        return fetch(event.request);
      }
    )
  );
});
