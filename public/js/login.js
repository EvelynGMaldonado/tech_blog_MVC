const loginForm = document.querySelector("#login-form");

//TODO: collect data from login form, make post request to log in user.  
//TODO: once you get an ok response, redirect to the profile page

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const loginEmail = document.querySelector("#email").value,
    const loginPassword = document.querySelector("#password").value,
    
    if(loginEmail && loginPassword){
        const resp = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            console.log(resp);
            location.replace('/profile')
        } else {
            alert('YOU ENTERED THE WRONG INFORMATION')
        }
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const signupEmail = document.querySelector('#signupemail').value
    const signupUsername = document.querySelector('#signupusername').value
    const signupPassword = document.querySelector('#signuppassword').value

    if(signupEmail && signupPassword && signupUsername){
        const resp = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email:signupEmail, password:signupPassword, name:signupUsername }),
            headers: { 'Content-Type': 'application/json' }
        })

        if(resp.ok){
            location.href = '/profile'
        } else {
            alert('User already exists')
        }
    }
});