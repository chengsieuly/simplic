import { FirebaseApp, initializeApp } from 'firebase/app';
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

export {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

export {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PRODUCT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export class Firebase {
  public app: FirebaseApp;
  public storage: FirebaseStorage;
  public db: Firestore;

  static shared = new Firebase();

  constructor() {
    this.app = initializeApp(config);
    this.storage = getStorage(this.app);
    this.db = getFirestore(this.app);

    if (process.env.NODE_ENV === 'development') {
      connectStorageEmulator(this.storage, '192.168.0.238', 9199);
      connectFirestoreEmulator(this.db, '192.168.0.238', 8080);

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
  }
}
