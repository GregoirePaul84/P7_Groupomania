import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/user.actions';


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
    
    useEffect(() => {

        dispatch(getAllUsers());

        for (let i in comments) {
            if (postId === comments[i].post_id) {
                
                const textComment = comments[i].text; 
                const commentId = comments[i].comment_id;
    
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
            const commentId = comments[j].comment_id;
            if (usersResults !== undefined) {
                const findUserById = usersResults.find(x => x.user_id === comments[j].user_id);
        
                const selectComment = document.querySelector('.comment_id'+commentId);
                const selectImgBox = selectComment.querySelector('.user-picture');
                selectImgBox.setAttribute('src', findUserById.profil_pic)

                const selectName = selectComment.querySelector('h3');
                selectName.textContent = findUserById.first_name + ', ' + findUserById.last_name;

                const selectEmail = selectComment.querySelector('p');
                selectEmail.textContent = findUserById.email;

                const selectDate = selectComment.querySelector('.comment-date');
                selectDate.textContent = findUserById.created;
            }
            
        }
    // eslint-disable-next-line
    }, [usersResults]);

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
                        <span className="comment-date">{"created"}</span>
                        <div className="comment-content">
                            <div className='message'>
                            </div>
                        </div>
                    </div>
                    <div className="comments-likes">
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-up " + "comment_id-green" + postId} icon={ faThumbsUp } />
                        <span className="comment-like">{""} like</span>
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-down " + "comment_id-red" + postId} icon={ faThumbsDown } />
                        <span className="comment-dislike">{""} dislike</span>
                    </div>
                </div>
            </div>
    );
    
};

export default Comments;