import React from 'react';

const Comments = () => {

    function displayComments() {
        const selectContainer = document.querySelector('.comments-container');
        console.log(selectContainer);
    }

    return (
        <div className="comments-container">
            Commentaires
        </div>
    );
};

export default Comments;