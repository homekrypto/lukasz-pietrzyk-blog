import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnluqE5xixhktIM-VN0ZOw4dDLFpJGrXE",
  authDomain: "lukaszpietrzyk-72409.firebaseapp.com",
  projectId: "lukaszpietrzyk-72409",
  storageBucket: "lukaszpietrzyk-72409.appspot.com",
  messagingSenderId: "953248181072",
  appId: "1:953248181072:web:b225b722233e36ff695a55",
  measurementId: "G-VGWVGYJVR4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
