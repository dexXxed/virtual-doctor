import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBFhVu4DUzU_1H-L6GnLVzoZD5eTbAXA0A",
    authDomain: "virtual-doctor-7f8cb.firebaseapp.com",
    databaseURK: "https://virtual-doctor-7f8cb-default-rtdb.firebaseio.com/",
    projectId: "virtual-doctor-7f8cb",
    storageBucket: "virtual-doctor-7f8cb.appspot.com",
    messagingSenderId: "1055261292661",
    appId: "1:1055261292661:web:cf82cf533c0b981913603c",
    measurementId: "G-66W238BMV8"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch {
}


export default firebase.database();

