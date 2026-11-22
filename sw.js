const CACHE_NAME = "khelearn-v1";
const BASE_URL = new URL("./", self.location.href);

const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "script.js",
  "manifest.json",
  "homepage-kids.png",
  "game-focus.png",
  "game-logic.png",
  "game-math.png",
  "game-memory.png",
  "game-words.png",
  "focus.html",
  "focus.css",
  "focus.js",
  "math.html",
  "math.css",
  "math.js",
  "memory.html",
  "memory.css",
  "memory.js",
  "puzzle.html",
  "puzzle.css",
  "puzzle.js",
  "together.html",
  "together.css",
  "together.js",
  "word.html",
  "word.css",
  "word.js",
  "icons/icon-192.png",
  "icons/icon-512.png"
].map((file) => new URL(file, BASE_URL).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});