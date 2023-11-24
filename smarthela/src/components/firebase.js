import firebase from'@react-native-firebase/app';
import '@react-native-firebase/auth';;
import '@react-native-firebase/firestore' ;// Import other Firebase services as needed

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBOO1TcCCjnnJwD9_XIsnOzfcjzyK4lvi0",
  authDomain: "bank-f492a.firebaseapp.com",
  databaseURL: "https://bank-f492a-default-rtdb.firebaseio.com",
  projectId: "bank-f492a",
  storageBucket: "bank-f492a.appspot.com",
  messagingSenderId: "317405327324",
  appId: "1:317405327324:web:c3e9af8c102e6b1f212919",
  measurementId: "G-TMCW4SN2YM"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
