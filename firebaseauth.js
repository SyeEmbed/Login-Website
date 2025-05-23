
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBbZv0P8hbMuA_D1VWug2wPrVzzKN1dPSw",
    authDomain: "login-project-a3e5e.firebaseapp.com",
    projectId: "login-project-a3e5e",
    storageBucket: "login-project-a3e5e.appspot.com",
    messagingSenderId: "624259792489",
    appId: "1:624259792489:web:a166606c47cdab847b2cf8"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    } ,5000);
};

const signUp = document.getElementById('submitSignUp');

signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName
        };

        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href = 'index.html';
        })
        .catch((error)=>{
            console.error("Error writing document.", error);
        });

    })
    .catch((error)=>{
        const errorCode = error.code;
        if(errorCode == 'auth/email-already-in-use'){
            showMessage('Email Address Already In Use.', 'signUpMessage');
        }
        else{
            showMessage('Unable to create user.', 'signUpMessage');;
        }
    }) 
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) =>{
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Login is successful!', 'signInMessage');
        const user = userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    })
    .catch((error) => {
        const errorCode = error.code;
        if(errorCode === 'auth/invaild-credential'){
            showMessage('Incorrent Email or Password.', 'signInMessage');
        }
        else{
            showMessage('Invalid Try Again.', 'signInMessage');
        }
    })
});