// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzdvqA1et5FSEsli6GVKOpu_8UiDRvtEg",
  authDomain: "real-chat-2.firebaseapp.com",
  projectId: "real-chat-2",
  storageBucket: "real-chat-2.appspot.com",
  messagingSenderId: "628244156418",
  appId: "1:628244156418:web:6b50898f1a8bcdf515571b",
  measurementId: "G-HQXBX6ZQHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()