import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyB1J39JCwdrJ4JUp23tFKr70P81AvHv-Rk",
  authDomain: "smarthome-dadn.firebaseapp.com",
  projectId: "smarthome-dadn",
  storageBucket: "smarthome-dadn.appspot.com",
  messagingSenderId: "338534288535",
  appId: "1:338534288535:web:61ebb7bd23146e31b2edd2",
  measurementId: "G-KN8GFRJ7YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);