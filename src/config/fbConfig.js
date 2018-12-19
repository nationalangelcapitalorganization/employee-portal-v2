import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJ6WSIJjFsZKAW-Au5Cdxjv337ckDVUPc",
  authDomain: "naco-employee-portal.firebaseapp.com",
  databaseURL: "https://naco-employee-portal.firebaseio.com",
  projectId: "naco-employee-portal",
  storageBucket: "naco-employee-portal.appspot.com",
  messagingSenderId: "18841270613"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;