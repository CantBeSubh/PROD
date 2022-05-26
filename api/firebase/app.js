import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyC3BKOFXGiEkCfygzUJ8Ela_t60exVqvfs',
  authDomain: "prod-db-e3b7a.firebaseapp.com",
  projectId: "prod-db-e3b7a",
  storageBucket: "prod-db-e3b7a.appspot.com",
  messagingSenderId: "1019609525789",
  appId: "1:1019609525789:web:fcf8328205d7b74a28a0f4"
};

const app= initializeApp(firebaseConfig);
export default app 
