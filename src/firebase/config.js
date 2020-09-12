import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDe7fnken1kd8LoKw4cEbVRUEiQTHYiCqk",
    authDomain: "crop-ad4da.firebaseapp.com",
    databaseURL: "https://crop-ad4da.firebaseio.com",
    projectId: "crop-ad4da",
    storageBucket: "crop-ad4da.appspot.com",
    messagingSenderId: "235327154623",
    appId: "1:235327154623:web:ed4aa67a897fd0ecbb190a"
};


firebase.initializeApp(firebaseConfig);


export { firebase };
