import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default class FireBase {
  firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  constructor() {
    // Initialize Firebase
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.fireStore = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }
}
