// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAnAoHglsTY1lkKW1izfYCUrKqCXEouyE8",
//   authDomain: "recruitmentmanagementsystem0.firebaseapp.com",
//   projectId: "recruitmentmanagementsystem0",
//   storageBucket: "recruitmentmanagementsystem0.firebasestorage.app",
//   messagingSenderId: "837303029930",
//   appId: "1:837303029930:web:d0dfe03316e2637764c0d3",
//   measurementId: "G-07QEY560WQ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Firebase core
import { initializeApp } from "firebase/app";

// Firebase Authentication
import { getAuth } from "firebase/auth";

// (Optional) Analytics
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAnAoHglsTY1lkKW1izfYCUrKqCXEouyE8",
  authDomain: "recruitmentmanagementsystem0.firebaseapp.com",
  projectId: "recruitmentmanagementsystem0",
  storageBucket: "recruitmentmanagementsystem0.firebasestorage.app",
  messagingSenderId: "837303029930",
  appId: "1:837303029930:web:d0dfe03316e2637764c0d3",
  measurementId: "G-07QEY560WQ",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ EXPORT AUTH (THIS IS WHAT Login.jsx NEEDS)
export const auth = getAuth(app);

// Optional: analytics
export const analytics = getAnalytics(app);
