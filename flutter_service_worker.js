'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "06ffab71946bc0304c82dbdfb3fada65",
"assets/Assets/beep.mp3": "aab3f7ea62c83e31318d25e661823773",
"assets/Assets/bg1.png": "b8e9581fd28ea2b754d97815b3147519",
"assets/Assets/bg2.png": "445cb64b00fa1c0e28135bad6327114e",
"assets/Assets/cisco.png": "19388023948672b5c92ed1d76a0dfc9e",
"assets/Assets/crack.png": "aa4863dc261dfad31f1d03775d070067",
"assets/Assets/destroy.png": "a1b5600c40ff3f571c5803c37634df36",
"assets/Assets/doodle.png": "35e205faa221c16a19fcb5d0fb16869b",
"assets/Assets/ey.png": "8a2eb32c1b6fe23d7862a4df13ccc267",
"assets/Assets/girlscript.png": "871dd0b712c6fb1cfdd8f3107262f7a5",
"assets/Assets/github.jpg": "cdd9af384ffdea859d8e090f788bdf84",
"assets/Assets/gmail.jpg": "13b925fce4c05a327b140599c0f80399",
"assets/Assets/incubate.png": "16ddffdef1baa1fb96c573ec8aa0c2fd",
"assets/Assets/kriti.png": "b189c7db6868bf795e65c0ef7b51cd3c",
"assets/Assets/linkedin.png": "30c453b7f5fbdb09ea0cb42a5dc7a6e5",
"assets/Assets/node.png": "3eea1067fe72c89b099642cd6a9d5a9a",
"assets/Assets/p0_0.png": "9dab298eae178e24069743251886ca10",
"assets/Assets/p0_1.png": "0fef3875c2e6b0ebd7ff0b4138b01b50",
"assets/Assets/p0_2.png": "10c17a3e95928f8e39eaad77440b4f17",
"assets/Assets/p0_3.png": "b061fb810e39fed27b1b42ef7fb031ec",
"assets/Assets/p0_4.png": "5a53cb61cda37de045d550efdaa6446b",
"assets/Assets/p1_0.png": "32e80da51465905217844688451485ae",
"assets/Assets/p1_1.png": "564da23e53655915a706595117b25431",
"assets/Assets/p1_2.png": "2aadb7f3762a8b747cc1b9fb5f092c79",
"assets/Assets/p2_0.png": "7df23dd8b37469b0d7d1651c10e8e963",
"assets/Assets/p2_1.png": "f2c0444fd1c0b81f011d2662c626789d",
"assets/Assets/p2_2.png": "7b1e35015726ab48c721221a21b5b6ba",
"assets/Assets/p2_3.png": "70460d1c4e9edd7c50223cb39bf75e5c",
"assets/Assets/p2_4.png": "9a567bb01802e073538f13322cae10c1",
"assets/Assets/p2_5.png": "c0eace2796303fc194d9fdd406e511a2",
"assets/Assets/robot.png": "5905b309d0534c19e54f04cc29284e4c",
"assets/Assets/sportsboard.png": "38b72d461c184a155d19357abea6825d",
"assets/Assets/swc.png": "189e9e090bd11b0141ceeaec9bdbaf79",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/NOTICES": "d6eb0f1c6ad42bd3d990a8fbe9086ce4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound.js": "3320b684446ace9b7e0f4a1d9bd9e287",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound_player.js": "965e55bc20eecc7ed70640d113358709",
"assets/packages/flutter_sound_web/js/flutter_sound/flutter_sound_recorder.js": "453bc49ac506730361dd0573a10322b1",
"assets/packages/flutter_sound_web/js/howler/howler.core.min.js": "55e0af0319483be8a7371a2cceacf921",
"assets/packages/flutter_sound_web/js/howler/howler.js": "2bba823e6b4d71ea019d81d384672823",
"assets/packages/flutter_sound_web/js/howler/howler.min.js": "0245b64fba989b9e3fd5b253f683d0e4",
"assets/packages/flutter_sound_web/js/howler/howler.spatial.min.js": "28305f7b4898c9b49d523b2e80293ec8",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "1fd92ac6582a6d8a446c8875edead05a",
"/": "1fd92ac6582a6d8a446c8875edead05a",
"main.dart.js": "d904e20f1f1a6c1cda93d7ab9ff7399a",
"manifest.json": "3e47cc7fff267c47559ac4e9b106abe6",
"version.json": "426313f2f3133c2f20415344c4a22df3"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
