import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/user.actions';
import { convertTime } from '../../App';
import { decreaseNbOfComments, deleteComment, deleteDislikeComment, deleteLikeComment, deletePictureComment, getComments, updateComment} from '../../actions/comment.actions';
import { getUserPosts } from '../../actions/user_posts.actions';

export function displayComments(postId) {
    const selectInput = document.querySelector(`.input-post_id${postId}`);
    selectInput.style.display = "block";
    const selectContainer = document.querySelectorAll(`.input-post_id${postId}`);
    for (let i=0; i<selectContainer.length; i+=1) {
        selectContainer[i].style.display = "block";
    }
}

export function hideComments(postId) {
    const selectInput = document.querySelector(`.input-post_id${postId}`);
    selectInput.style.display = "none";
    const selectContainer = document.querySelectorAll(`.input-post_id${postId}`);
    for (let i=0; i<selectContainer.length; i+=1) {
        selectContainer[i].style.display = "none";
    }
}

const Comments = ({comment}) => {

    const dispatch = useDispatch();
        
    const allUsersData = useSelector((state) => state.userAllReducer);
    const usersResults = allUsersData.results;

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);


    const updateItem = () => {
        if(textUpdate) {
            console.log(textUpdate);
            dispatch(updateComment(comment.comment_id, textUpdate))
                .then(() => setIsUpdated(false))
                .then(() => dispatch(getComments()));
        }
    }
    
    useEffect(() => {

        dispatch(getAllUsers());
    // eslint-disable-next-line    
    }, []);


    const deleteCom = () => {
        dispatch(deleteComment(comment.comment_id, comment.post_id))
            .then(() => dispatch(decreaseNbOfComments(comment.post_id)))
            .then(() => dispatch(deletePictureComment(comment.comment_id)))
            .then(() => dispatch(deleteLikeComment(comment.comment_id)))
            .then(() => dispatch(deleteDislikeComment(comment.comment_id)))
            .then(() => dispatch(getComments()))
            .then(() => dispatch(getUserPosts(comment.user_id)));
    }

    if(usersResults === undefined) return;
    const filterUser = usersResults.filter((elt) => elt.user_id === comment.user_id);
      
    return (
        
            <div className="flex-container">
                <div className="comments-smallContainer">
                    <div className="comment-user-picture">
                    {(filterUser[0] === undefined) ? 
                        <img className="user-picture" src={'http://localhost:3000/images/empty_profil_pic.png'} alt="utilisateur"/>
                        :
                        <img className="user-picture" src={filterUser[0].profil_pic} alt="utilisateur" /> }
                    </div>
                    <div className="comment-name-user">
                        {(filterUser[0] === undefined) ?
                        <h3>Profil supprimé</h3>
                        :
                        <>
                            <h3 className='comment-user-name'>{filterUser[0].first_name}, {filterUser[0].last_name}</h3>
                            <p className='email'>{filterUser[0].email}</p>
                        </> }
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
                        <span className="comment-date">{convertTime(comment.created)}</span>
                        <div className="comment-content">
                            {isUpdated === false && 
                                <div className='message'>{comment.text}</div>
                                }
                            {isUpdated && (
                                <div className="update-comment">
                                    <textarea
                                        className="update-content"
                                        defaultValue={comment.text}
                                        onChange={ (e) => setTextUpdate(e.target.value)}
                                    />
                                    <div className="update-button">
                                        <button className='btn' onClick={updateItem}>Modifier</button>
                                    </div>
                                </div>
                            )}
                            { (comment.image_url) ? 
                                <div className='comment-picture'>
                                    <img src={comment.image_url} alt="commentaire" className='comment-img'/>
                                </div>
                                : <div></div>}
                        </div>
                    </div>
                    <div className="comments-likes">
                        {/* { (likesCommentId.includes(comment.comment_id) && likesUserId.includes(comment.user_id)) ? 
                            <FontAwesomeIcon icon={ faThumbsUp } 
                                             className={`thumbs-up comment comment_id-green${comment.comment_id} active-green`} 
                                             onClick={()=> {
                                                toggleLike();
                                             }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsUp } 
                                             className={`thumbs-up comment comment_id-green${comment.comment_id}`}  
                                             onClick={()=> {
                                                toggleLike();
                                             }}/>
                        } */}
                        { (comment.like_number > 1) ? <span className="comment-like">{comment.like_number} 
                                                        <span className="like-text"> likes</span>
                                                      </span> 
                                                      : 
                                                      <span className="comment-like">{comment.like_number} 
                                                        <span className="like-text"> like</span>
                                                    </span> }
                        {/* { (dislikesCommentId.includes(comment.comment_id) && dislikesUserId.includes(comment.user_id)) ? 
                            <FontAwesomeIcon icon={ faThumbsDown } 
                                             className={`thumbs-down comment comment_id-red${comment.comment_id} active-red`} 
                                             onClick={()=> {
                                                toggleDislike();
                                             }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsDown } 
                                             className={`thumbs-down comment comment_id-red${comment.comment_id}`} 
                                             onClick={()=> {
                                                toggleDislike();
                                             }}/>
                        } */}
                        { (comment.dislike_number > 1) ? <span className="comment-dislike">{comment.dislike_number} 
                                                            <span className="dislike-text"> dislikes</span>
                                                        </span> 
                                                        : 
                                                        <span className="comment-dislike">{comment.dislike_number} 
                                                            <span className="dislike-text"> dislike</span>
                                                        </span> }
                    </div>
                </div>
            </div>
    );
    
};

export default Comments;