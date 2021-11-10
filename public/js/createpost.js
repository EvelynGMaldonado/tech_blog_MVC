const createPostForm = document.getElementById("create-post-form");
const createPostBTN = document.getElementById("create-post-btn");

const createPost = async(event)=> {
    event.preventDefault();
    console.log("creating a post");
    const name = document.querySelector("#post-name").value;
    const description = document.querySelector("#validationTextarea").value;
    console.log(name, description);
    if(name && description){
        const resp = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ name:name, description:description }),
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


}



createPostForm.addEventListener('submit', createPost);
createPostBTN.addEventListener('click', createPost);