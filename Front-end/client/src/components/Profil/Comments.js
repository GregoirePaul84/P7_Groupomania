import React from 'react';

export function displayComments(postId) {
    console.log(postId);
    const selectContainer = document.querySelector(`.post_id${postId}`);
    selectContainer.style.display = "block";
}

export function hideComments(postId) {
    const selectContainer = document.querySelector(`.post_id${postId}`);
    selectContainer.style.display = "none";
}

const Comments = (props) => {

    console.log(props.postId);
    const postId = props.postId;

    return (
        // eslint-disable-next-line
        <div className={"comments-container " + "post_id" + postId}>
            Commentaires
        </div>
    );
};

export default Comments;