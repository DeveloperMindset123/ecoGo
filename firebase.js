import { initializeApp } from 'firebase/app';
import { config } from 'dotenv';

config();

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
	apiKey: process.env.GOOGLE_MAPS_API_KEY,
	authDomain: 'hack-col.firebaseapp.com',
	projectId: 'hack-col',
	storageBucket: 'hack-col.appspot.com',
	messagingSenderId: '1043828288816',
	appId: '1:1043828288816:web:d67f9553a2c4b96140ecf5',
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
console.log(process.env.GOOGLE_MAPS_API_KEY);
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
