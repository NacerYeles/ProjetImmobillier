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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

var facebook = document.getElementById('facebook');

var google = document.getElementById('google');

facebook.addEventListener('click' , () => {
        
    var providerFacebook = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(providerFacebook).then((result) => {
            //var token = result.credential.accessToken;
            //var user = result.user;
            fetch('/auth-facebook', { 
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                method:"POST", 
                body: JSON.stringify(result.user) 
            }).then(response => response.text()).then((response => {
                // console.log(response);
                if(response == 'OK') {
                    document.location = '/';
                } else {
                    alert("Oups il y a eut une erreur");
                }
            }));
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        })    
})

google.addEventListener('click' , () => {
        
    var providerGoogle = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(providerGoogle).then((result) => {
            //var token = result.credential.accessToken;
            //var user = result.user;
            console.log('toto google');
            fetch('/auth-google', {
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                method:"POST",
                body: JSON.stringify(result.user) 
            }).then(response => response.text()).then((response => {
                // console.log(response);
                if(response == 'OK') {
                    document.location = '/';
                } else {
                    alert("Oups il y a eut une erreur");
                }
            }));
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        })    
})

