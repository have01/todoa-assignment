import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCbJ73A8tLWrmTrJg083GZ1Jhi_2WbD3f0",
    authDomain: "todo-app-1d530.firebaseapp.com",
    projectId: "todo-app-1d530",
    storageBucket: "todo-app-1d530.appspot.com",
    messagingSenderId: "328362533038",
    appId: "1:328362533038:web:da58296dbee78b14a7cd3f"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
