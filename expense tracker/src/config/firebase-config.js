// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//this getFirestore import is for addDoc functionality of our custom hook useAddTransaction and it will allow us to create a 
//reference to our database
import {getFirestore} from "firebase/firestore"

//inorder to handle our authentication function inside auth -> index.jsx
import {getAuth , GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIVkqD2YeuTMU6g9brxeJOljIRxwQn4eY",
  authDomain: "expense-tracker-bb02f.firebaseapp.com",
  projectId: "expense-tracker-bb02f",
  storageBucket: "expense-tracker-bb02f.appspot.com",
  messagingSenderId: "200175167365",
  appId: "1:200175167365:web:b7a47c2e84b5c4d6b2c6ec",
  measurementId: "G-YKPSZ33P1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider =  new GoogleAuthProvider(); 
export const auth = getAuth(app);

//creating a reference of our database to use to update collection 
export const db = getFirestore(app);

const analytics = getAnalytics(app);