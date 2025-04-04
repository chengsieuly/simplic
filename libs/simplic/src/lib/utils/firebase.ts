import { initializeApp } from 'firebase/app';
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from 'firebase/firestore';
import {
  connectStorageEmulator,
  FirebaseStorage,
  getStorage,
} from 'firebase/storage';

export let storage: FirebaseStorage;
export let db: Firestore;

export const init = () => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PRODUCT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = initializeApp(config);
  storage = getStorage(app);
  db = getFirestore(app);

  if (process.env.NODE_ENV === 'development') {
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFirestoreEmulator(db, 'localhost', 8080);

    if (typeof window !== 'undefined') {
      // hide the firebase error message
      const el = document.getElementsByClassName(
        'firebase-emulator-warning'
      )[0];

      if (el) {
        el.remove();
      }

      console.warn(
        'Using firebase auth emulator. Make sure this is not used in production.'
      );
    }
  }
};
