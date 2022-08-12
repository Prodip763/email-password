// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASRSqGTlVmWMojD9fGJgvINuO3WMT7Iqo",
  authDomain: "email-password-auth-bef31.firebaseapp.com",
  projectId: "email-password-auth-bef31",
  storageBucket: "email-password-auth-bef31.appspot.com",
  messagingSenderId: "1032202737902",
  appId: "1:1032202737902:web:deda3ba8fde48b0bc67bff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;