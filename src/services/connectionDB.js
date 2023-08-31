import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDR9tDeSTtz-32iqoL89ntABHfo9J9KCWw",
  authDomain: "tickets-chamado.firebaseapp.com",
  projectId: "tickets-chamado",
  storageBucket: "tickets-chamado.appspot.com",
  messagingSenderId: "482640409767",
  appId: "1:482640409767:web:810b672bf7a139c3f9d782"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
