importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js");

firebase.initializeApp({
  messagingSenderId: "XXXXXXX"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
