import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAr0kJG-uvAbUR6F2QerKB770wCAbkIw7g",
	authDomain: "vue-demo-ad6f0.firebaseapp.com",
	databaseURL: "https://vue-demo-ad6f0-default-rtdb.firebaseio.com",
	projectId: "vue-demo-ad6f0",
	storageBucket: "vue-demo-ad6f0.appspot.com",
	messagingSenderId: "468020340204",
	appId: "1:468020340204:web:c8fd19f503edb266b6ccc9",
};

firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const firebaseAuth = getAuth();

export { db, firebaseAuth };
