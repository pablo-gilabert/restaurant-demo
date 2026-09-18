import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCUdIs5CR_ZqoVup8FXjK5YliNrorbFye0",
  authDomain: "restaurant-demo-25143.firebaseapp.com",
  projectId: "restaurant-demo-25143",
  storageBucket: "restaurant-demo-25143.firebasestorage.app",
  messagingSenderId: "309494336782",
  appId: "1:309494336782:web:06a50c080f0c6bd5891b5f"
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)