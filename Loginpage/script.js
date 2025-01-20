// Redirect to the homepage
function goToHomepage() {
    window.location.href = "../index.html"; // Replace with the actual homepage URL
}

// Show the appropriate form
function showForm(formType) {
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const tabs = document.querySelectorAll('.tab-btn');

    if (formType === 'login') {
        loginForm.classList.add('active-form');
        signupForm.classList.remove('active-form');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        signupForm.classList.add('active-form');
        loginForm.classList.remove('active-form');
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
}
// Handle login
function handleLogin(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginName').value;
    const loginPassword = document.getElementById('loginPassword').value;

 
    const errorContainer = document.getElementById('loginError'); 
    errorContainer.innerHTML = '';


    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const storedName = localStorage.getItem("userName"); 


    if (!storedEmail || !storedPassword || !storedName) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = "You need to sign up before logging in.";
        errorContainer.appendChild(errorMessage);
        return;
    }


    if (loginUsername === storedName && loginPassword === storedPassword) {
      
        localStorage.setItem("userInitial", loginUsername.charAt(0).toUpperCase());

        // Redirect to homepage
        goToHomepage();
    } else {
      
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = "Invalid login credentials.";
        errorContainer.appendChild(errorMessage);
    }
}


function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userName");
    localStorage.removeItem("userInitial");

   
    window.location.href = "login.html";
}


// Handle signup
function handleSignup(event) {
    event.preventDefault();

    const signupUsername = document.getElementById('signupName').value;
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;

    
    const errorContainer = document.getElementById('signupError'); 

  
    errorContainer.innerHTML = '';


    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail === signupEmail) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = "Email is already registered. Please log in.";
        errorContainer.appendChild(errorMessage);
        return; 
        }

   
    localStorage.setItem("userEmail", signupEmail); 
    localStorage.setItem("userPassword", signupPassword); 
    localStorage.setItem("userName", signupUsername); 

    localStorage.setItem("userInitial", signupUsername.charAt(0).toUpperCase());


    // Redirect to homepage
    goToHomepage();
}

function checkLoginBeforeBooking() {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        const errorContainer = document.getElementById('bookingError');
        errorContainer.innerHTML = ''; 

        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = "You must be logged in to book a ticket.";
        errorContainer.appendChild(errorMessage);

        window.location.href = "login.html";
    }
}


