const updatePostForm = document.getElementById("update-post-form");
const updatePostBTN = document.getElementById("update-post-btn");
const deletePostBTN = document.getElementById("delete-post-btn");

const updatePost = async(event)=> {
event.preventDefault();
console.log("updating a post");
const name = document.querySelector("#post-name").value;
const description = document.querySelector("#validationTextarea").value;
const postId = document.querySelector("#post-id").dataset.post;

//if name is not ""
let update = {}
if(name !="") {
        update.name = name
}
if(description !="") {
        update.description=description
}
if(name==="" && description==="")return
console.log(update)
const resp = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({...update}),
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

const deletePost = async(e) => {
        e.preventDefault()
        const postId = document.querySelector("#post-id").dataset.post;
        const resp = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
        })
        if(resp.ok){
                location.replace('/dashboard')
        } else {
                
                alert('YOU ENTERED THE WRONG INFORMATION')
        }
        
}


updatePostForm.addEventListener('submit', updatePost);
updatePostBTN.addEventListener('click', updatePost);
deletePostBTN.addEventListener("click", deletePost);