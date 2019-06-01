import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyBciX3lSI4kCVU3GqG77PbN4jOjeT8HWxU",
  authDomain: "fir-" +
      "-5047e.firebaseapp.com",
  databaseURL: "https://fir-offline-5047e.firebaseio.com",
  projectId: "fir-offline-5047e",
  storageBucket: "fir-offline-5047e.appspot.com",
  messagingSenderId: "498482983298"
};
firebase.initializeApp(config);
firebase.firestore();
firebase.firestore().settings({  });
firebase.firestore().enablePersistence()
    .catch(function(err) {
        console.log(err)
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
export default firebase
