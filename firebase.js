// database/firebaseDb.js
import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH8QZu2fTd3_CezYuIdbImiOeLAWB-Sac",
  authDomain: "turfcricket-80def.firebaseapp.com",
  projectId: "turfcricket-80def",
  storageBucket: "turfcricket-80def.appspot.com",
  messagingSenderId: "379015379813",
  appId: "1:379015379813:web:7cd36fbb54b6416a42ff8c",
  measurementId: "G-550H5KB0CB",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;
