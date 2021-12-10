import firebaseApp from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/performance";
import "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcbHL2jYrslvb-c0FlD-Q_G3_wHQQZ-fw",
  authDomain: "moogchi.firebaseapp.com",
  projectId: "moogchi",
  storageBucket: "moogchi.appspot.com",
  messagingSenderId: "635020849832",
  appId: "1:635020849832:web:127b49adf46a54063f489d",
  measurementId: "G-BQNKPXX6M5",
};

// Initialize Firebase
if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(firebaseConfig);
} else {
  firebaseApp.app(); // if already initialized, use that one
}
// firebaseApp.initializeApp(firebaseConfig);
firebaseApp.analytics();
firebaseApp.performance();
export default firebaseApp;
