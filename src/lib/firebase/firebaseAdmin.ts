// firebaseAdmin.js
import { getAuth } from 'firebase-admin/auth';
import { cert, initializeApp } from 'firebase-admin/app';

const adminApp = initializeApp({
  credential: cert(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_KEY || ''),
});

export const adminAuth = getAuth(adminApp);
