import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/user.actions';
import { convertTime } from '../../App';
import { cancelDislikeComment, cancelLikeComment, decreaseNbOfComments, deleteComment, deleteDislikeComment, deleteLikeComment, deletePictureComment, dislikeComment, getComments, likeComment, updateComment} from '../../actions/comment.actions';
import { getUserPosts } from '../../actions/user_posts.actions';


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
    const comments = props.comments;
    const commentId = props.commentId;
    const likeNumber = props.nbOfLikes;
    const dislikeNumber = props.nbOfDislikes;
    const commentText = props.commentText;
    const imgUrl = props.imgUrl;
    const commentDate = props.commentDate;
    const userId = props.userId;
    const postId = props.postId;
    

    const [greenActive, setGreenActive] = useState(true);
    const [redActive, setRedActive] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);


    const updateItem = () => {
        if(textUpdate) {
            console.log(textUpdate);
            dispatch(updateComment(commentId, textUpdate))
                .then(() => setIsUpdated(false))
                .then(() => dispatch(getComments()));
        }
    }
    
    useEffect(() => {

        dispatch(getAllUsers());

    // eslint-disable-next-line    
    }, []);

    const allUsersData = useSelector((state) => state.userAllReducer);
    const usersResults = allUsersData.results;
    
    useEffect(() => {
        for (let j in comments) {

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
                const transformedDate = convertTime(commentDate);
                selectDate.textContent = transformedDate;

                if (commentText !== null) {
                    const selectMessageBox = selectComment.querySelector('.message');
                    selectMessageBox.textContent = `${commentText}`; 
                }

                if (imgUrl !== null) {
                    const selectPic = selectComment.querySelector('.comment-img');
                    selectPic.setAttribute('src', imgUrl);
                }

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
        dispatch(likeComment(commentId))
            .then(() => dispatch(getComments()));
    }

    function removeLike() {
        console.log(`==> like annulé : comment_id ${commentId}`);
        dispatch(cancelLikeComment(commentId))
            .then(() => dispatch(getComments()));
    }

    // eslint-disable-next-line
    const toggleLike = () => {
        setGreenActive(!greenActive);
        console.log(greenActive);

        if (greenActive === true) {
            addLike();
            const selectElt = document.querySelector(`.comment_id-green${commentId}`);
            selectElt.classList.add('active-green');

            // Ajout de l'id du commentaire liké dans le local storage
            const likesArray = JSON.parse(localStorage.getItem('commentGreenActive') || '[]');
            likesArray.push(`.comment_id-green${commentId}`);
            localStorage.setItem('commentGreenActive', JSON.stringify(likesArray));

            // Vérification si l'utilisateur a déjà disliké le commentaire: si oui, on annule le dislike
            const selectContainer = document.querySelector(`.comment_id-red${commentId}`);
            if (selectContainer.classList.contains('active-red')) {
                toggleDislike();
            }
        }
        else if (greenActive === false) {
            removeLike();
            const selectElt = document.querySelector(`.comment_id-green${commentId}`);
            selectElt.classList.remove('active-green');

            // Suppression de l'id du commentaire liké dans le local storage
            const likesArray = JSON.parse(localStorage.getItem('commentGreenActive'));
            const index = likesArray.indexOf(`.comment_id-green${commentId}`);
            if (index >= 0) {
            likesArray.splice( index, 1 );
            }
            localStorage.setItem('commentGreenActive', JSON.stringify(likesArray));
        }
    };

    function addDislike() {
        console.log(`==> comment disliké : comment_id ${commentId}`);
        dispatch(dislikeComment(commentId))
            .then(() => dispatch(getComments()));
    }

    function removeDislike() {
        console.log(`==> dislike annulé : comment_id ${commentId}`);
        dispatch(cancelDislikeComment(commentId))
            .then(() => dispatch(getComments()));
    }   

    // eslint-disable-next-line
    const toggleDislike = () => {
        setRedActive(!redActive);

        if (redActive === true) {
            addDislike();
            const selectElt = document.querySelector(`.comment_id-red${commentId}`);
            selectElt.classList.add('active-red');

            // Ajout de l'id du commentaire liké dans le local storage
            const dislikesArray = JSON.parse(localStorage.getItem('commentRedActive') || '[]');
            dislikesArray.push(`.comment_id-red${commentId}`);
            localStorage.setItem('commentRedActive', JSON.stringify(dislikesArray));

            // Vérification si l'utilisateur a déjà liké le commentaire: si oui, on annule le like
            const selectContainer = document.querySelector(`.comment_id-green${commentId}`);
            if (selectContainer.classList.contains('active-green')) {
                toggleLike();
            }
        }
        else if (redActive === false) {
            removeDislike();
            const selectElt = document.querySelector(`.comment_id-red${commentId}`);
            selectElt.classList.remove('active-red');

            // Suppression de l'id du commentaire liké dans le local storage
            const dislikesArray = JSON.parse(localStorage.getItem('commentRedActive'));
            const index = dislikesArray.indexOf(`.comment_id-red${commentId}`);
            if (index >= 0) {
            dislikesArray.splice( index, 1 );
            }
            localStorage.setItem('commentRedActive', JSON.stringify(dislikesArray));
        }
    };

    const deleteCom = () => {
        dispatch(deleteComment(commentId, postId))
            .then(() => dispatch(decreaseNbOfComments(postId)))
            .then(() => dispatch(deletePictureComment(commentId)))
            .then(() => dispatch(deleteLikeComment(commentId)))
            .then(() => dispatch(deleteDislikeComment(commentId)))
            .then(() => dispatch(getComments()))
            .then(() => dispatch(getUserPosts(userId)));
    }

    useEffect(() => {
        
        const likesArray = JSON.parse(localStorage.getItem('commentGreenActive'));
        
        for (let i in likesArray) {
            const selectElt = document.querySelector(likesArray[i]);
    
            if (selectElt !== null) {
                selectElt.classList.add('active-green');
            }
        }

        const dislikesArray = JSON.parse(localStorage.getItem('commentRedActive'));
        
        for (let j in dislikesArray) {
            const selectElt = document.querySelector(dislikesArray[j]);
    
            if (selectElt !== null) {
                selectElt.classList.add('active-red');
            }
        }
    
    }, [toggleLike, toggleDislike])

        
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
                        <FontAwesomeIcon className="pen" icon={faPen} 
                        onClick={() => setIsUpdated(!isUpdated)}/>
                        <FontAwesomeIcon className="garbage" icon={faTrashCan} 
                        onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?'))
                            { deleteCom() }
                        }} />
                    </div>
                    <div className="comment-message-box">
                        <FontAwesomeIcon icon={ faPaperPlane } />
                        <span className="comment-date">{""}</span>
                        <div className="comment-content">
                            {isUpdated === false && 
                                <div className='message'>{commentText}</div>
                                }
                            {isUpdated && (
                                <div className="update-comment">
                                    <textarea
                                        className="update-content"
                                        defaultValue={commentText}
                                        onChange={ (e) => setTextUpdate(e.target.value)}
                                    />
                                    <div className="update-button">
                                        <button className='btn' onClick={updateItem}>Modifier</button>
                                    </div>
                                </div>
                            )}
                            { (imgUrl) ? 
                                <div className='comment-picture'>
                                    <img src="" alt="commentaire" className='comment-img'/>
                                </div>
                                : <div></div>}
                        </div>
                    </div>
                    <div className="comments-likes">
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-up comment"} icon={ faThumbsUp }  onClick={toggleLike}/>
                        { (likeNumber > 1) ? <span className="comment-like">{likeNumber} likes</span> : <span className="comment-like">{likeNumber} like</span> }
                        {/* eslint-disable-next-line */}
                        <FontAwesomeIcon className={"thumbs-down"} icon={ faThumbsDown } onClick={toggleDislike}/>
                        { (dislikeNumber > 1) ? <span className="comment-dislike">{likeNumber} dislikes</span> : <span className="comment-dislike">{dislikeNumber} dislike</span> }
                    </div>
                </div>
            </div>
    );
    
};

export default Comments;