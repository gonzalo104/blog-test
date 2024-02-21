/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );


const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst } = workbox.strategies;


const cacheNetworkFirst = [
    '/api/v1/posts',
]

registerRoute(
  ({ request, url }) => {
      if ( cacheNetworkFirst.includes( url.pathname ) ) return true
      return false;
  },
  new NetworkFirst()
)

const cacheFirstNetwork = [
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
  ({ request, url }) => {
      if ( cacheFirstNetwork.includes( url.href ) ) return true        
      return false;
  },
  new CacheFirst()
)

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});


