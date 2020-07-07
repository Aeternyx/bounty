const CACHE_NAME = 'cache';

let fetchHandler;
self.addEventListener('fetch', fetchHandler = function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

async function loadSpritesheets(i=0) {
  await fetch(`data/${i}.png`).then(function (response) {
    fetchHandler({ request: `data/${i}.png`, respondWith: function (response) {} });
    loadSpritesheets(i + 1);
  });
}
loadSpritesheets();

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName === CACHE_NAME;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
