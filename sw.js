let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/',
                "/users"
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl= event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 

// sw.js
this.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
    };
    event.waitUntil(
      this.registration.showNotification('Título de la Notificación', options)
    );
  });
  