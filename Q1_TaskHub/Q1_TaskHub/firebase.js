import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCGsi0dsbGdEgtSfPjwrjTInYV3EPJg1w8',
  authDomain: 'test-2--taskhub.firebaseapp.com',
  projectId: 'test-2--taskhub',
  storageBucket: 'test-2--taskhub.firebasestorage.app',
  messagingSenderId: '687293780721',
  appId: '1:687293780721:web:f211df366d9db830b2cf50',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);