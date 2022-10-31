import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBKqOFKTfvYs5V2RxS3E2fEpwQ3kN5YQF4",
    authDomain: "proyectointegrador-prog3.firebaseapp.com",
    projectId: "proyectointegrador-prog3",
    storageBucket: "proyectointegrador-prog3.appspot.com",
    messagingSenderId: "241900662167",
    appId: "1:241900662167:web:65ec1997ad07a0ea86a8d2"
  };
  
 
  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();