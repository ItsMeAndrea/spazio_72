import * as admin from 'firebase-admin';

const admin = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://spazio72-90148.firebaseio.com'
});

export default admin;
