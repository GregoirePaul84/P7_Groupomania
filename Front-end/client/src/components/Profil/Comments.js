import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/user.actions';


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
    const comments = props.comment;
    console.log(comments);

    
    useEffect(() => {

        dispatch(getUser());

        for (let i in comments) {
            if (postId === comments[i].post_id) {
                
                const textComment = comments[i].text; 
                const commentId = comments[i].comment_id;
                const userId = props.comment[i].user_id;
                dispatch(getUser(userId));
                // const selectImgBox = selectComment.querySelector('.user-picture');
                // selectImgBox.setAttribute('src', )
                const selectComment = document.querySelector('.comment_id'+commentId);
                const selectMessageBox = selectComment.querySelector('.message');
                selectMessageBox.innerHTML = `${textComment}`;
            }
        }

    // eslint-disable-next-line    
    }, []);

    const userData = useSelector((state) => state.userReducer);
    const userResults = userData.results;
    const firstName = userResults.first_name;
    console.log(firstName);

    
    return (
        
            <div className="flex-container">
                <div className="comments-smallContainer">
                    <div className="comment-user-picture">
                        <img className="user-picture" src={"objectUser.profil_pic"} alt="utilisateur" />
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
                            <div className='message'>
                            
                            </div>
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
    );
    
};

export default Comments;