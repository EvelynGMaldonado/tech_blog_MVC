const seeFullPostBTN = document.getElementById("see-full-post-btn");
const postCommentBTN = document.getElementById("my-comment");

const tocomment = async(e) => {
    e.preventDefault()
    if(req.session.loggedIn){
        if(resp.ok){
            location.href = '/comments'
        } else {
            alert('You need to login in order to comment')
            location.href = '/login'
        }
    }
};

const leaveComment = async(e) => {
    e.preventDefault()

}


postCommentBTN.addEventListener('click',leaveComment);
seeFullPostBTN.addEventListener('click', tocomment);