/*
    Service worker for the browser notifications.
    This has been placed in the root directory to manage the scope of the SW.
    As per the official documentation, this should be placed in the root directory.
    Otherwise, it requries a header in the response Allow-service-header : 'Path' .
*/

console.log('Started', self);

self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
    console.log('Activated', event);
});

self.addEventListener('push', function(event) {
    console.log('Push message received: ', event.data.json());
    var payload = event.data.json();
    var title = 'Push message';
    event.waitUntil(
        self.registration.showNotification(
            payload.title, {
                body: payload.body,
                icon: payload.icon,
                tag: payload.tag,
                requireInteraction: true
            }));
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: event : ');
    console.log(event);
    event.notification.close();
    notification_url = event.notification.tag.split('|||')[1];
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        }).then(function(windowClients) {
            console.log('WindowClients', windowClients);
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                console.log('WindowClient', client);
                if (client.url === notification_url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(notification_url);
            }
        }));
});

self.addEventListener('fetch', (event) => {});