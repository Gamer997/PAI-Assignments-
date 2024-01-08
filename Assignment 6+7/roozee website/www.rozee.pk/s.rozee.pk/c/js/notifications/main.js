var applicationServerKey =
    'BMBlr6YznhYMX3NgcWIDRxZXs0sh7tCv7_YCsWcww0ZCv9WGg-tRCXfMEHTiBPCksSqeve1twlbmVAZFv7GSuj0';

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported by the browser.');
        navigator.serviceWorker.register(site_url + 'sw.js').then(function() {
            return navigator.serviceWorker.ready;
        }).then(function(reg) {
            console.log('Service Worker is ready :^)', reg);
            subscribePushManager(reg);
        }).catch(function(error) {
            console.log('Service Worker error :^(', error);
        });
    } else {
        console.log('Browser does not support service workers.');
    }
}

function deniedByUser() {
    if (window.Notification && Notification.permission !== "denied") {
        return false;
    }
    return true;
}

function generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function subscribePushManager(reg) {
    var rz_notifications_cookie = '';
    var subscription_data = '';
    if (document.cookie.indexOf('rz_notifications') == -1) {
        uuid = generateUUID();
        document.cookie = 'rz_notifications=' + uuid + '; expires=Fri, 31 Dec 9999 11:59:00 UTC; path=/; domain=' + DOMAIN_COOKIE + ';secure';
        rz_notifications_cookie = document.cookie.split('rz_notifications=')[1].split(';')[0].trim();
    } else {
        rz_notifications_cookie = document.cookie.split('rz_notifications=')[1].split(';')[0].trim();
    }
    console.log('Subscribing push manager');
    if (!deniedByUser()) {
        reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
        }).then(function(sub) {
            console.log('subscription data : ');
            subscription_data = JSON.parse(JSON.stringify(sub));
            subscription_data.active = 'Y';
            subscription_data.uuid = rz_notifications_cookie;
            console.log(subscription_data);
            toServer(subscription_data);
        }).catch(function(error) {
            subscription_data = {
                uuid: rz_notifications_cookie,
                active: 'N'
            };
            toServer(subscription_data);
            console.log('No response chosen : ', error);
        });
    } else {
        subscription_data = {
            uuid: rz_notifications_cookie,
            active: 'N'
        };
        toServer(subscription_data);
        console.log('Notifications have been blocked by the user.');
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function toServer(subscription_data) {
    $.ajax({
        type: 'POST',
        url: ajax_url + 'webnotifications/subscribe',
        data: subscription_data,
        success: function(results) {
            console.log('Response from server : ');
            console.log(results);
        }
    });
}