const loginForm = document.getElementById("login-form");
const loginFormBTN = document.getElementById("login-form-button");

//TODO: collect data from login form, make post request to log in user.  
//TODO: once you get an ok response, redirect to the profile page

const login = async (e)=>{
    e.preventDefault();
    const username = document.querySelector("#username").value;
    const loginPassword = document.querySelector("#password").value;
    if(username && loginPassword){
        const resp = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username: username, password: loginPassword }),
            headers: { 'Content-Type': 'application/json' }
        })

        // resp = await resp.json();
        console.log(resp);
        if(resp.ok){
            location.replace('/dashboard')
        } else {
            
            alert('YOU ENTERED THE WRONG INFORMATION')
        }
    }
};



loginForm.addEventListener('submit', login);
loginFormBTN.addEventListener('click', login);