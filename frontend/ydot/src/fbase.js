import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCtE3j9HIkyUePlBM740HqdP0MhfRvjitI",
    authDomain: "ydot-23a93.firebaseapp.com",
    projectId: "ydot-23a93",
    storageBucket: "ydot-23a93.appspot.com",
    messagingSenderId: "997957851385",
    appId: "1:997957851385:web:6912df687e5d06b8972a28",
    measurementId: "G-EFMVK60X5W"
  };
  // Initialize Firebase
  var fire = firebase.initializeApp(firebaseConfig);
  export default fire