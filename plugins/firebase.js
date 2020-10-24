import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
	apiKey: "AIzaSyC9bAqXqwN10bYXOsIdiL_lH3rikT06Xw4",
	authDomain: "szalacsi-school-dev.firebaseapp.com",
	databaseURL: "https://szalacsi-school-dev.firebaseio.com",
	projectId: "szalacsi-school-dev",
	storageBucket: "szalacsi-school-dev.appspot.com",
	messagingSenderId: "331348426235",
	appId: "1:331348426235:web:7a9356cdca53fad8b71f5e"
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : "";
export const auth = firebase.auth();
export const db = firebase.database();
export default firebase;
