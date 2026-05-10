const CACHE_NAME = 'dr-mourad-v1';
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// تثبيت ملفات البرنامج في ذاكرة الموبايل
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل الخدمة وحذف الكاش القديم
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// استدعاء الملفات من الذاكرة لو مفيش نت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
