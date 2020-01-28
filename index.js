MsgElem = document.getElementById("msg");
TokenElem = document.getElementById("token");
NotisElem = document.getElementById("notis");
ErrElem = document.getElementById("err");
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyAuRduOKK2DnRjow0AEOVXxT13xDkK8Vto",
  authDomain: "angular-pwa-push.firebaseapp.com",
  databaseURL: "https://angular-pwa-push.firebaseio.com",
  projectId: "angular-pwa-push",
  storageBucket: "angular-pwa-push.appspot.com",
  messagingSenderId: "937961744284",
  appId: "1:937961744284:web:8f37e23063da28e7750a59",
  measurementId: "G-9T7FT0GCYZ"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    MsgElem.innerHTML = "Notification permission granted.";
    console.log("Notification permission granted.");

    // get the token in the form of promise
    return messaging.getToken();
  })
  .then(token => {
    TokenElem.innerHTML = "Token Is : " + token;
    //console.log('subscribe...');
    //subscribeTokenToTopic(token, "allUsers");
  })
  .catch(err => {
    ErrElem.innerHTML = ErrElem.innerHTML + "; " + err;
    console.log("Unable to get permission to notify.", err);
  });

messaging.onMessage(payload => {
  console.log("Message received. ", payload);
  const { title, ...options } = payload.notification;
});

function subscribeTokenToTopic(token, topic) {
  fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
    method: "POST",
    headers: new Headers({
      Authorization:
        "key=AAAA2mLgZ5w:APA91bGMB6E2DGYihmbKoJaAmN3m1X5jad0Xm4aUUUeK2UMsExuM3C5bZqbCM9wAs-UCF4CWSyLZwv34l-yQqIK7wceZ37P-BGV3dC1tqjvlA1rzDkbCN8uNfh-F5Bm8dFRNbxNsE04a"
    })
  })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw "Error subscribing to topic: " +
          response.status +
          " - " +
          response.text();
      }
      console.log('Subscribed to "' + topic + '"');
    })
    .catch(error => {
      console.error(error);
    });
}
