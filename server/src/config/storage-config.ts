import * as admin from "firebase-admin";
import { Config } from "./config";

const firebaseConfig = {
  type: "service_account",
  projectId: Config.FIREBASE_PROJECT_ID,
  privateKeyId: Config.FIREBASE_PRIVATE_KEY_ID,
  privateKey: Config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: Config.FIREBASE_CLIENT_EMAIL,
  clientId: Config.FIREBASE_CLIENT_ID,
  authUri: Config.FIREBASE_AUTH_URI,
  tokenUri: Config.FIREBASE_TOKEN_URI,
  authProviderX509CertUrl: Config.FIREBASE_AUTH_PROVIDER_CERT,
  clientX509CertUrl: Config.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: "dsrc-data.appspot.com",
});

export const bucket = admin.storage().bucket();
