import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDdXGzfJi4vJs-sJKsTUHcHQYtV49keaVY",
  authDomain: "letschat-ddb58.firebaseapp.com",
  databaseURL: "https://letschat-ddb58.firebaseio.com",
  projectId: "letschat-ddb58",
  storageBucket: "letschat-ddb58.appspot.com",
  messagingSenderId: "426237976527",
  appId: "1:426237976527:web:ac08731925348396a27cba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

