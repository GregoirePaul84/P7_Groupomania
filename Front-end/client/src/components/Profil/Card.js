import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { likePost, cancelLikePost, dislikePost, cancelDislikePost, deletePost, updatePost } from '../../actions/post.actions';
import Comments, {displayComments, hideComments} from './Comments';
import InputComments from './InputComments';
import { getComments} from '../../actions/post_comments.actions';
import { getUserPosts } from '../../actions/user_posts.actions';
import { convertTime } from '../../App';


const Card = ({post}) => {

    const postId = post.post_id;
    const userId = post.user_id;
    const isoDate = post.created;

    const dispatch = useDispatch();

    const [greenActive, setGreenActive] = useState(true);
    const [redActive, setRedActive] = useState(true);
    const [visibility, setVisibility] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);


    const updateItem = () => {
        if(textUpdate) {
            console.log(textUpdate);
            dispatch(updatePost(postId, textUpdate, userId))
                .then(() => setIsUpdated(false));
        }
    }

    function addLike() {
        console.log(`==> post liké : post_id ${postId}`);
        dispatch(likePost(postId, userId));
    }

    function removeLike() {
        console.log(`==> like annulé : post_id ${postId}`);
        dispatch(cancelLikePost(postId, userId));
    }

    function addDislike() {
        console.log(`==> post disliké : post_id ${postId}`);
        dispatch(dislikePost(postId, userId));
    }

    function removeDislike() {
        console.log(`==> dislike annulé : post_id ${postId}`);
        dispatch(cancelDislikePost(postId, userId));
    }

    const toggleLike = () => {
        setGreenActive(!greenActive);
        
        if (greenActive === true) {
            addLike();
            const selectElt = document.querySelector(`.post_id-green${postId}`);
            selectElt.classList.add('active-green');
        }
        else if (greenActive === false) {
            removeLike();
            const selectElt = document.querySelector(`.post_id-green${postId}`);
            selectElt.classList.remove('active-green');
        }
    };

    const toggleDislike = () => {
        setRedActive(!redActive);
        
        if (redActive === true) {
            addDislike();
            const selectElt = document.querySelector(`.post_id-red${postId}`);
            selectElt.classList.add('active-red');
        }
        else if (redActive === false) {
            removeDislike();
            const selectElt = document.querySelector(`.post_id-red${postId}`);
            selectElt.classList.remove('active-red');
        }
    };

    const toggleVisibility = () => {
        
        setVisibility(!visibility);
        console.log(visibility);
        if (visibility) {
            displayComments(postId);
        }
        else {
            hideComments(postId);
        }
    }

    const deleteArticle = () => {
        dispatch(deletePost(postId))
            .then(() => dispatch(getUserPosts(userId)))
    }
    

    useEffect(() => {
        dispatch(getUserPosts(userId));
        dispatch(getComments());

    }, [dispatch, userId])

    
    const userData = useSelector((state) => state.userReducer);
    const commentsData = useSelector((state) => state.commentsReducer);
    

    let objectUser = {};
    objectUser = userData.results[0];
    const imgUrl = post.image_url;
    const commentsArray = commentsData.results;
    const numberOfComments = post.comments_number;
    const numberOfLikes = post.like_number;
    const numberOfDislikes = post.dislike_number;

    if (commentsArray === undefined) {
        return;
    }

    return (
        <>
        <div className="card-container">
            <div className="card-smallContainer">
                <div className="card-user-picture">
                    <img src={objectUser.profil_pic} alt="utilisateur" />
                </div>
                <div className="card-name-user">
                    <h3>{objectUser.first_name}, {objectUser.last_name}</h3>
                    <p>{objectUser.email}</p>
                </div>
                <div className="modify-delete">
                    <FontAwesomeIcon icon={faPen} onClick={() => setIsUpdated(!isUpdated)}/>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?'))
                            { deleteArticle() }
                    }} />
                </div>
                <div className="card-message">
                    <FontAwesomeIcon icon={ faPaperPlane } />
                    <span className="post-date">{convertTime(isoDate)}</span>
                    <div className="post-content">
                        {isUpdated === false && <div className='message'>{post.text}</div>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    className="update-content"
                                    defaultValue={post.text}
                                    onChange={ (e) => setTextUpdate(e.target.value)}
                                />
                                <div className="update-button">
                                    <button className='btn' onClick={updateItem}>Modifier</button>
                                </div>
                            </div>
                        )}
                        { (imgUrl) ? 
                            <div className='picture'>
                                <img src={imgUrl} alt="post utilisateur" />
                            </div>
                            : <div></div>}
                    </div>
                </div>
                <div className="card-likes-comments">
                <FontAwesomeIcon icon={ faMessage } onClick={toggleVisibility}/>
                { (numberOfComments > 1) ? <span>{numberOfComments} commentaires</span> : <span>{numberOfComments} commentaire</span> }
                {/* eslint-disable-next-line */}
                <FontAwesomeIcon className={"thumbs-up " + "post_id-green" + postId} icon={ faThumbsUp } onClick={toggleLike}/>
                { (numberOfLikes > 1) ? <span className="post-like">{numberOfLikes} likes</span> : <span className="post-like">{numberOfLikes} like</span> }
                {/* eslint-disable-next-line */}
                <FontAwesomeIcon className={"thumbs-down " + "post_id-red" + postId} icon={ faThumbsDown } onClick={toggleDislike} />
                { (numberOfDislikes > 1) ? <span className="post-dislike">{numberOfDislikes} likes</span> : <span className="post-dislike">{numberOfDislikes} like</span> }
                </div>
            </div>
        </div>
        {/* eslint-disable-next-line */}
        <div className={"input-comments-container " + "input-post_id" + postId}>
            <InputComments postId={postId} infoUser={objectUser} />
            {/* eslint-disable-next-line */}
            {commentsArray.map((comment) => {
                if (comment.post_id === postId) {
                    
                    return (
                        // eslint-disable-next-line
                        <div className={"comments-container " + "post_id" + postId + " comment_id" + comment.comment_id} key={comment.comment_id}> 
                            <Comments postId={postId} comment={commentsArray} key={comment.comment_id} />
                        </div>
                    )
                }
            })}
        </div>
        </>
    );
};

export default Card;