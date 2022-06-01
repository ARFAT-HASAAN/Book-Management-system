import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.Config"
import { getFirestore } from "firebase/firestore";


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
export default db;