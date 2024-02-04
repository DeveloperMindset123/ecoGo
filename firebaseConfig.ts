import { initializeApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import {GOOGLE_MAPS_API_KEY} from '@env'


// config();

const firebaseConfig = {
  apiKey: GOOGLE_MAPS_API_KEY,
  authDomain: "hack-col.firebaseapp.com",
  projectId: "hack-col",
  storageBucket: "hack-col.appspot.com",
  messagingSenderId: "1043828288816",
  appId: "1:1043828288816:web:d67f9553a2c4b96140ecf5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
