import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB8_RpaNtkMf5vbsjE5uQMk3S8XgPZWC1o",
    authDomain: "reactcrud-c483c.firebaseapp.com",
    databaseURL: "https://reactcrud-c483c.firebaseio.com",
    projectId: "reactcrud-c483c",
    storageBucket: "reactcrud-c483c.appspot.com",
    messagingSenderId: "499575357977",
    appId: "1:499575357977:web:9e85f828dab123494ee088",
    measurementId: "G-4116MX20VJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;