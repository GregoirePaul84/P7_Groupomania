import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';


export function displayComments(postId) {
    const selectInput = document.querySelector(`.input-post_id${postId}`);
    selectInput.style.display = "block";
    const selectContainer = document.querySelectorAll(`.post_id${postId}`);
    for (let i=0; i<selectContainer.length; i+=1) {
        selectContainer[i].style.display = "block";
    }
}

export function hideComments(postId) {
    const selectInput = document.querySelector(`.input-post_id${postId}`);
    selectInput.style.display = "none";
    const selectContainer = document.querySelectorAll(`.post_id${postId}`);
    for (let i=0; i<selectContainer.length; i+=1) {
        selectContainer[i].style.display = "none";
    }
}

const Comments = (props) => {

    const postId = props.postId;
    console.log(props);
    const comments = props.comment;
    console.log(comments);
   
    return (
        // eslint-disable-next-line
        <div className={"comments-container " + "post_id" + postId}>
            <div className="flex-container">
                <div className="comments-smallContainer">
                    <div className="comment-user-picture">
                        <img src={"objectUser.profil_pic"} alt="utilisateur" />
                    </div>
                    <div className="comment-name-user">
                        <h3>{"objectUser.first_name"}, {"objectUser.last_name"}</h3>
                        <p>{"objectUser.email"}</p>
                    </div>
                    <div className="modify-delete">
                        <FontAwesomeIcon className="pen" icon={faPen}/>
                        <FontAwesomeIcon className="garbage" icon={faTrashCan} />
                    </div>
                    <div className="comment-message">
                        <FontAwesomeIcon icon={ faPaperPlane } />
                        <span className="comment-date"></span>
                        <div className="comment-content">
                            <div className='message'></div>
                            { (1 + 1 === 3) ?
                                <div className='picture'>
                                    <img src={""} alt="commentaire utilisateur" />
                                </div>
                                : <div></div>}
                        </div>
                    </div>
                    <div className="comments-likes">
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-up " + "comment_id-green" + postId} icon={ faThumbsUp } onClick={console.log("toggleLike")}/>
                        <span className="comment-like">{""} like</span>
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-down " + "comment_id-red" + postId} icon={ faThumbsDown } onClick={console.log("toggleDislike")} />
                        <span className="comment-dislike">{""} dislike</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comments;