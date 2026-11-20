import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaOwSX...", // Use your actual key from the previous screen
  authDomain: "ngp-crew-manager.firebaseapp.com",
  databaseURL: "https://ngp-crew-manager-default-rtdb.firebaseio.com", 
  projectId: "ngp-crew-manager",
  storageBucket: "ngp-crew-manager.firebasestorage.app",
  messagingSenderId: "470929385856",
  appId: "1:470929385856:web:3a330df1cfc11ceed63965"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);