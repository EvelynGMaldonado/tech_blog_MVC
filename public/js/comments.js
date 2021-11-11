const postCommentForm = document.getElementById("create-comment-form");
const postCommentBTN = document.getElementById("my-comment-btn");

const tocomment = async(e) => {
    e.preventDefault()
    const postId = document.querySelector("#post-id").dataset.post;
    const body = document.querySelector("#validationTextarea").value;
    console.log(body, postId);
    if(body && postId){
        const resp = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ body:body, postId:postId}),
            headers: { 'Content-Type': 'application/json' }
        })

        // resp = await resp.json();
        console.log(resp);
        if(resp.ok){
            location.reload()
        } else {
            
            alert('YOU ENTERED THE WRONG INFORMATION')
        }
 };
}


postCommentBTN.addEventListener('click',tocomment);
postCommentForm.addEventListener('submit', tocomment);