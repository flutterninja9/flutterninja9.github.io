// Firebase Configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCdPnIng9UipvIFD1JWD03XHJHwZJBuaDk',
    authDomain: 'the-flutter-ninja.firebaseapp.com',
    projectId: 'the-flutter-ninja',
    storageBucket: 'the-flutter-ninja.appspot.com',
    messagingSenderId: '995856575892',
    appId: '1:995856575892:web:a416f1bb9165c156197381'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

console.log('Firebase initialized successfully'); 