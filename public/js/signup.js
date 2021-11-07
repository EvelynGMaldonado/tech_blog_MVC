const signupForm = document.getElementById("signup-form");
const signupFormBTN = document.getElementById("signup-form-button");

const signup = async (e) => {
    e.preventDefault()
    const signupEmail = document.querySelector('#signupemail').value.toLowerCase();
    const signupUsername = document.querySelector('#signupusername').value.toLowerCase();
    const signupPassword = document.querySelector('#signuppassword').value.toLowerCase();
    console.log(signupPassword);

    if(signupEmail && signupPassword && signupUsername){
        const resp = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email:signupEmail, password:signupPassword, username:signupUsername }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            location.href = '/dashboard'
        } else {
            alert('User already exists')
            location.href = '/login'
        }
    }
};

signupForm.addEventListener('submit', signup);
signupFormBTN.addEventListener('click', signup);

