// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC-u4-O9tGmQKDciWbEymNz91jNTzWmlEU",
    authDomain: "projetimmobilier-9ea8c.firebaseapp.com",
    projectId: "projetimmobilier-9ea8c",
    storageBucket: "projetimmobilier-9ea8c.appspot.com",
    messagingSenderId: "419316271088",
    appId: "1:419316271088:web:c3bcdf43776f6d75e53f35",
    measurementId: "G-E21BW16FHC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

var facebook = document.getElementById('facebook');

facebook.addEventListener('click' , () => {
    
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        
        console.log("LE TOKEN  : ", token);
        console.log("LE USER  : " , user);
        console.log('coucoutoi');
        
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    })

})