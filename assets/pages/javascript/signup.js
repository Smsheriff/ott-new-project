import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCdlgHLDEcQb2IJhReeObkq6VhfPfnC-Uk",
  authDomain: "movie-wave-c171b.firebaseapp.com",
  projectId: "movie-wave-c171b",
  storageBucket: "movie-wave-c171b.firebasestorage.app",
  messagingSenderId: "1073642279250",
  appId: "1:1073642279250:web:aeaaaa670899a84434aa8b",
  measurementId: "G-D4PR4H1M6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Authentication service
const analytics = getAnalytics(app);

// Export auth for use in other files
export { auth, createUserWithEmailAndPassword };

// Get form elements
const name = document.getElementById("signup-name");
const email = document.getElementById("signup-email");
const password = document.getElementById("signup-password");
const confirmPassword = document.getElementById("confirm-password");

const nameerror = document.getElementById("nameerror");
const emailerror = document.getElementById("emailerror");
const passworderror = document.getElementById("passworderror");
const cpasserror = document.getElementById("cpasserror");

const btn = document.getElementById("signup-btn");

const signform = document.getElementById("signform");

const minlength = 8; 
const hasNumber = /[0-9]/;
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;


signform.addEventListener("submit", (event) => {
    event.preventDefault(); 

    // Clear previous error messages
nameerror.textContent = "";
emailerror.textContent = "";
passworderror.textContent = "";
cpasserror.textContent = "";

let valid = true;

// Validate username
if(name.value.length<3){
nameerror.textContent = "Username must be atleast 3 characters long";
valid = false;
}
if(name.value.length === 0){
    nameerror.textContent = "Username required";
    valid = false;
    }

// Validate email
if(email.value.length === 0){
emailerror.textContent = "Email required";
valid = false;
} 

else if(!validateEmail(email.value)){
emailerror.textContent = "Please enter a valid email";
valid = false;
}

 // Validate password
if (password.value.length === 0) {
passworderror.textContent = "Password required";
valid = false;
} 

else if(password.value.length < minlength){
passworderror.textContent = `Password must be at least ${minlength} characters long.`;
valid = false;
}

else if(!hasNumber.test(password.value)){
passworderror.textContent = "Password must contain at least one number.";
valid = false;
}

else if(!hasSpecialChar.test(password.value)){
passworderror.textContent = "Password must contain atleast one special character.";
valid = false;
}

// Validate confirm password
if(confirmPassword.value !== password.value){
cpasserror.textContent = "Passwords do not match";
valid = false;
}

// If all fields are valid, proceed to sign-up with Firebase Authentication
if (valid) {
    const emailValue = email.value;
    const passwordValue = password.value;

    // Disable the button to prevent multiple submissions
    btn.disabled = true;
    btn.innerText = 'Creating account...';

    // Firebase Authentication sign-up
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            // Successfully signed up
            const user = userCredential.user;
            console.log('Sign Up successful:', user);

            // Reset form and button state
            signform.reset();
            btn.disabled = false;
            btn.innerText = 'Create an account';

            // Optionally, redirect to another page
            window.location.href = "../html/home.html"; // Redirect after successful sign-up
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Show error message
            emailerror.textContent = errorMessage;
            console.error('Error during sign up:', errorCode, errorMessage);

            // Reset button state
            btn.disabled = false;
            btn.innerText = 'Create an account';
        });
}
});    

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Clear error messages on input
name.addEventListener("input", () => {
    nameerror.textContent = '';
});

email.addEventListener("input", () => {
    emailerror.textContent = '';
});

password.addEventListener("input", () => {
    passworderror.textContent = '';
});

confirmPassword.addEventListener("input", () => {
    cpasserror.textContent = '';
});

// Toggle password visibility
const togglePassword = document.querySelector('#togglePassword');
togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Toggle visibility for the confirm password field
const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});
