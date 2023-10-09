import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCxn7izDShN8Do5nrYTQSiu54sNN2G7Pvk",
    authDomain: "thehubsite-c06f0.firebaseapp.com",
    projectId: "thehubsite-c06f0",
    storageBucket: "thehubsite-c06f0.appspot.com",
    messagingSenderId: "7676647490",
    appId: "1:7676647490:web:b26339988f711700a7b5db"
  };

  //init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage,timestamp }