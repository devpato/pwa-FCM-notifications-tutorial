const tokenString = document.getElementById("token");
const errorMessage = document.getElementById("err");
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "XXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXX",
  measurementId: "XXXXXXXXXXXXXXX"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(() => {
    MsgElem.innerHTML = "Notifications allowed.";
    return messaging.getToken();
  })
  .then(token => {
    tokenString.innerHTML = "Token Is : " + token;
    //subscribeTokenToTopic(token, "allUsers");
  })
  .catch(err => {
    errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
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
      } else {
        console.log('Subscribed to "' + topic + '"');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
