import React from 'react'
import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCNlIVt6kGnVH9rs7emO-uj_4QB_i32LUY",
      authDomain: "rationaltips.firebaseapp.com",
      databaseURL: "https://rationaltips.firebaseio.com",
      projectId: "rationaltips",
      storageBucket: "rationaltips.appspot.com",
      messagingSenderId: "365449070938"

};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
db.settings({timestampsInSnapshots:true})

export default db 
