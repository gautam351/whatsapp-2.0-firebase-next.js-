import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZGYzsMKxNVdW9MXUmwBx9KvjwurvDmKo",
    authDomain: "chatapp-df08d.firebaseapp.com",
    projectId: "chatapp-df08d",
    storageBucket: "chatapp-df08d.appspot.com",
    messagingSenderId: "567757778180",
    appId: "1:567757778180:web:4e72eb933a4e59bb75b451",
    measurementId: "G-E9TY17PH5Y"
  };

  const app=!firebase.apps.length? firebase.initializeApp(firebaseConfig):firebase.app();
  
  const db =app.firestore();
  const auth=app.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider};