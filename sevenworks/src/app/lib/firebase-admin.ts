import * as admin from "firebase-admin";

console.log("FIREBASE_SERVICE_ACCOUNT exists:", !!process.env.FIREBASE_SERVICE_ACCOUNT);
// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  try {
    const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT!;
    console.log("Service account exists:", !!serviceAccountRaw);
    
    // Parse the JSON
    const serviceAccount = JSON.parse(serviceAccountRaw);
    
    // Sometimes you need to manually replace the escaped newlines
    if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    throw new Error("Failed to initialize Firebase Admin");
  }
}

export default admin;