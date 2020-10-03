import firebase from 'firebase';

//copy pasted from the firebase website for the particular app
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAPEf6Qiil2jFmhvXSuz2kXNeMCC0cO45o",
    authDomain: "todo-app-92f68.firebaseapp.com",
    databaseURL: "https://todo-app-92f68.firebaseio.com",
    projectId: "todo-app-92f68",
    storageBucket: "todo-app-92f68.appspot.com",
    messagingSenderId: "481931106709",
    appId: "1:481931106709:web:f7886019e25b1e48d93e9c",
    measurementId: "G-BPX0FV3TPL"
});

const db=firebaseApp.firestore();

export default db;