const APP_PREFIX = "BudgetTracker-";
const VERSION = 'v_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
	"./css/styles.css",
	"./js/idb.js",
	"./js/index.js",
	"./manifest.json",
	"./icons/icon-72x72.png",
	"./icons/icon-96x96.png",
	"./icons/icon-128x128.png",
	"./icons/icon-144x144.png",
	"./icons/icon-152x152.png",
	"./icons/icon-192x192.png",
	"./icons/icon-384x384.png",
	"./icons/icon-512x512.png",
];

// respond with cache resources
self.addEventListener("fetch", function(e) {
    console.log("fetch request : " + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (request) {
            return request || fetch(e.request);
        })
    );
});

// cache resources
self.addEventListener('install', function(e) {
    e.waitUntil(
        cahces.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// delete old cache
self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            // filter out cache names with this app prefix
            let cacheKeepList = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            // add current cache to keep list
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function (key, i) {
                    if (cacheKeepList.indexOf(key) === -1) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                }) 
            );
        })
    );
});