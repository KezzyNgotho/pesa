"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = _interopRequireDefault(require("@react-native-firebase/app"));

require("@react-native-firebase/auth");

require("@react-native-firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

;
// Import other Firebase services as needed
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBOO1TcCCjnnJwD9_XIsnOzfcjzyK4lvi0",
  authDomain: "bank-f492a.firebaseapp.com",
  databaseURL: "https://bank-f492a-default-rtdb.firebaseio.com",
  projectId: "bank-f492a",
  storageBucket: "bank-f492a.appspot.com",
  messagingSenderId: "317405327324",
  appId: "1:317405327324:web:c3e9af8c102e6b1f212919",
  measurementId: "G-TMCW4SN2YM"
}; // Initialize Firebase

if (!_app["default"].apps.length) {
  _app["default"].initializeApp(firebaseConfig);
}

var _default = _app["default"];
exports["default"] = _default;