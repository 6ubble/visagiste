const CACHE_NAME = 'visagiste-images-v1';

// Устанавливаем SW
self.addEventListener('install', event => {
  self.skipWaiting();
});

// Активируем SW
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Перехватываем запросы изображений
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Кэшируем только изображения с вашего CDN
  if (url.hostname === 's3.twcstorage.ru' && 
      event.request.url.match(/\.(avif|webp|jpg|jpeg|png)$/i)) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          // Если есть в кэше - отдаем
          if (response) {
            return response;
          }
          
          // Если нет - загружаем и кэшируем
          return fetch(event.request).then(fetchResponse => {
            if (fetchResponse.ok) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          });
        });
      })
    );
  }
});