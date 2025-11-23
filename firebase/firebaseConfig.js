import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDAI-tUgJMnNH9YEcEql-nnletiDo9Wz1s",
  authDomain: "tareamovil-59634.firebaseapp.com",
  projectId: "tareamovil-59634",
  storageBucket: "tareamovil-59634.firebasestorage.app",
  messagingSenderId: "1043382445459",
  appId: "1:1043382445459:web:73d870b82571a9485bb466"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };