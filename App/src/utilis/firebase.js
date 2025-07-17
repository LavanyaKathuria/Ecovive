import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzZF1KkA4UlegTVQuXmc0jx1Gz63Otv_I",
  authDomain: "ecovive-50fc6.firebaseapp.com",
  projectId: "ecovive-50fc6",
  storageBucket: "ecovive-50fc6.firebasestorage.app",
  messagingSenderId: "487171858112",
  appId: "1:487171858112:web:57d03be8cbdfeaddbf5725",
  measurementId: "G-97TT7YP6DB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
