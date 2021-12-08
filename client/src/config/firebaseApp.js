import firebaseApp from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/analytics";
import "firebase/compat/performance";

const appState = "test";

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
firebaseApp.initializeApp(firebaseConfig);
firebaseApp.analytics();
firebaseApp.performance();

// var firebaseConfig = {
//   apiKey: "AIzaSyAJm2AUpe4PfgGbt722fYsmPJicbz0_5JE",
//   authDomain: "projectquestion-2d800.firebaseapp.com",
//   databaseURL: "https://projectquestion-2d800.firebaseio.com",
//   projectId: "projectquestion-2d800",
//   storageBucket: "projectquestion-2d800.appspot.com",
//   messagingSenderId: "981521138720",
//   appId: "1:981521138720:web:40c994b8e6cf5383bca845",
//   measurementId: "G-NMV9YGV33L"
// };
// // Initialize Firebase
// firebaseApp.initializeApp(firebaseConfig);
// firebaseApp.analytics();

export default firebaseApp;
