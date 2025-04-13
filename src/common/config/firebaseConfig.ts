import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0sRTnQHswOHhYvPvYwmyBaqH6S49wt-U",
  authDomain: "nutrabiotics-ca3ef.firebaseapp.com",
  projectId: "nutrabiotics-ca3ef",
  storageBucket: "nutrabiotics-ca3ef.firebasestorage.app",
  messagingSenderId: "685032151882",
  appId: "1:685032151882:web:1f2140f40a2c05afae7fb3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
