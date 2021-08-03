const firebase = require('firebase/app').default;
const firebaseConfig = {
  apiKey: "AIzaSyC4VqwrcSY3HB7F2Og77zbM2AAy5S7eSHI",
  authDomain: "password-manager-ada7e.firebaseapp.com",
  projectId: "password-manager-ada7e",
  storageBucket: "password-manager-ada7e.appspot.com",
  messagingSenderId: "855278736272",
  appId: "1:855278736272:web:b248b2711b48a75ab39915",
  measurementId: "G-T3HXB1B20Q"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export default firebase