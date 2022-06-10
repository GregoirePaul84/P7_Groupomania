import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/user.actions';
import { convertTime } from '../../App';
import { cancelLikeComment, likeComment } from '../../actions/comment.actions';


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

    const dispatch = useDispatch();
    const postId = props.postId;
    const comments = props.comments;
    const commentId = props.commentId;

    const [greenActive, setGreenActive] = useState(true);
    const [redActive, setRedActive] = useState(true);
    
    useEffect(() => {

        dispatch(getAllUsers());

        for (let i in comments) {
            if (postId === comments[i].post_id) {
                
                const textComment = comments[i].text; 
    
                const selectComment = document.querySelector('.comment_id'+commentId);
                const selectMessageBox = selectComment.querySelector('.message');
                selectMessageBox.textContent = `${textComment}`;
            }
        }

    // eslint-disable-next-line    
    }, []);

    const allUsersData = useSelector((state) => state.userAllReducer);
    const usersResults = allUsersData.results;
    
    useEffect(() => {
        for (let j in comments) {

            if (usersResults !== undefined) {
                const findUserById = usersResults.find(x => x.user_id === comments[j].user_id);
                const findDateComment = comments.find(x => x.created === comments[j].created);
                console.log(findDateComment.created);
        
                const selectComment = document.querySelector('.comment_id'+commentId);
                const selectImgBox = selectComment.querySelector('.user-picture');
                selectImgBox.setAttribute('src', findUserById.profil_pic)

                const selectName = selectComment.querySelector('h3');
                selectName.textContent = findUserById.first_name + ', ' + findUserById.last_name;

                const selectEmail = selectComment.querySelector('p');
                selectEmail.textContent = findUserById.email;

                const selectDate = selectComment.querySelector('.comment-date');
                const transformedDate = convertTime(findDateComment.created);
                selectDate.textContent = transformedDate;

                const selectThumbUp = selectComment.querySelector('.thumbs-up');
                selectThumbUp.classList.add('comment_id-green' + commentId);

                const selectThumbDown = selectComment.querySelector('.thumbs-down');
                selectThumbDown.classList.add('comment_id-red' + commentId);
            }
            
        }
    // eslint-disable-next-line
    }, [usersResults]);

    function addLike() {
        console.log(`==> commentaire liké : comment_id ${commentId}`);
        dispatch(likeComment(commentId));
    }

    function removeLike() {
        console.log(`==> like annulé : comment_id ${commentId}`);
        dispatch(cancelLikeComment(commentId));
    }

    const toggleLike = () => {
        setGreenActive(!greenActive);

        if (greenActive === true) {
            addLike();
            const selectElt = document.querySelector(`.comment_id-green${commentId}`);
            selectElt.classList.add('active-green');
        }
        else if (greenActive === false) {
            removeLike();
            const selectElt = document.querySelector(`.comment_id-green${commentId}`);
            selectElt.classList.remove('active-green');
        }
    };

    const toggleDislike = () => {
        setRedActive(!redActive);

        if (redActive === true) {
            // addLike();
            const selectElt = document.querySelector(`.comment_id-red${commentId}`);
            selectElt.classList.add('active-red');
        }
        else if (redActive === false) {
            // removeLike();
            const selectElt = document.querySelector(`.comment_id-red${commentId}`);
            selectElt.classList.remove('active-red');
        }
    };
        
    return (
        
            <div className="flex-container">
                <div className="comments-smallContainer">
                    <div className="comment-user-picture">
                        <img className="user-picture" src={"profil_pic"} alt="utilisateur" />
                    </div>
                    <div className="comment-name-user">
                        <h3>{"first_name"}, {"last_name"}</h3>
                        <p>{"email"}</p>
                    </div>
                    <div className="modify-delete">
                        <FontAwesomeIcon className="pen" icon={faPen}/>
                        <FontAwesomeIcon className="garbage" icon={faTrashCan} />
                    </div>
                    <div className="comment-message">
                        <FontAwesomeIcon icon={ faPaperPlane } />
                        <span className="comment-date">{""}</span>
                        <div className="comment-content">
                            <div className='message'>
                            </div>
                        </div>
                    </div>
                    <div className="comments-likes">
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-up comment"} icon={ faThumbsUp }  onClick={toggleLike}/>
                        <span className="comment-like">{""} like</span>
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-down"} icon={ faThumbsDown } onClick={toggleDislike}/>
                        <span className="comment-dislike">{""} dislike</span>
                    </div>
                </div>
            </div>
    );
    
};

export default Comments;