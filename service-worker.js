/* =====================================
   GAME HUB OF SIR - SERVICE WORKER
===================================== */

const CACHE_NAME = "game-hub-v1";

const urlsToCache = [

  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./firebase.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"

];

/* Install */

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))

  );

});

/* Fetch */

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => response || fetch(event.request))

  );

});

/* Activate */

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {

            return caches.delete(key);

          }

        })

      );

    })

  );

});
