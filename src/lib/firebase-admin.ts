import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  try {
    initializeApp({
      projectId: "inap-piloto",
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error);
  }
}

export const adminDb = getFirestore();
