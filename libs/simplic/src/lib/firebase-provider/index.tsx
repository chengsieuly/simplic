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
import { createContext, useContext, useEffect, useState } from 'react';

export {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

const FirebaseContext = createContext<{
  storage?: FirebaseStorage;
  db?: Firestore;
  loading: boolean;
}>({
  loading: true,
});

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PRODUCT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const [storage, setStorage] = useState<FirebaseStorage>();
  const [db, setDb] = useState<Firestore>();

  useEffect(() => {
    const app = initializeApp(config);
    const storage = getStorage(app);
    const db = getFirestore(app);

    setStorage(storage);
    setDb(db);

    if (process.env.NODE_ENV === 'development') {
      connectStorageEmulator(storage, '192.168.0.238', 9199);
      connectFirestoreEmulator(db, '192.168.0.238', 8080);

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
  }, []);

  return (
    <FirebaseContext.Provider value={{ storage, db, loading: !storage || !db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = useContext(FirebaseContext);
