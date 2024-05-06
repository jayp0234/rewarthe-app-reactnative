// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEvVJsxrOlMioXeOrmSw5NkUxzM2CchrA",
  authDomain: "capstonerewarthe.firebaseapp.com",
  projectId: "capstonerewarthe",
  storageBucket: "capstonerewarthe.appspot.com",
  messagingSenderId: "17188323678",
  appId: "1:17188323678:web:74dc7034b2b417cf6acfcf",
  measurementId: "G-H6HF8MT645"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
