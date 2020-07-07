/* globals loadit dewit, rm_init */
loadit()
dewit(Rooms.rm_init)

if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('worker.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('WARNING: Service workers are not supported. This page will not be available offline.');
}
