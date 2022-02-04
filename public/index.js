const tokenString = document.getElementById("token");
const errorMessage = document.getElementById("error");
const message = document.getElementById("message");
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "AIzaSyCHar7yvLthZxDIQPTlccrM0fNdKr4k-7c",
  authDomain: "fcm-firebase-test-614b9.firebaseapp.com",
  projectId: "fcm-firebase-test-614b9",
  storageBucket: "fcm-firebase-test-614b9.appspot.com",
  messagingSenderId: "636290037707",
  appId: "1:636290037707:web:bd990bc730149811f6684e"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(() => {
    message.innerHTML = "Notifications allowed";
    return messaging.getToken();
  })
  .then(token => {
    tokenString.innerHTML = "Token Is : " + token;
    //subscribeTokenToTopic(token, "allUsers");
  })
  .catch(err => {
    errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
    console.log("Unable to get permission to notify", err);
  });

messaging.onMessage(payload => {
  console.log("Message received. ", payload);
  const { title, ...options } = payload.notification;
});

function subscribeTokenToTopic(token, topic) {
  fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
    method: "POST",
    headers: new Headers({
      Authorization: "key=SERVICE KEY"
    })
  })
    .then(response => {
      if (response.status < 200 || response.status >= 400) {
        throw "Error subscribing to  the following topic: " +
          response.status +
          " - " +
          response.text();
      } else {
        console.log('Successfully subscribed to "' + topic + '"');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
