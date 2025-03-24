import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: process.env.STORAGE_BUCKET,
  projectId: process.env.PROJECT_ID,
});

const db = admin.firestore();

export { admin, db };