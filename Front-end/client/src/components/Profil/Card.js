import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { displayLikes, likePost, cancelLikePost, dislikePost, cancelDislikePost } from '../../actions/post.actions';
import Comments, {displayComments, hideComments} from './Comments';



const Card = ({post}) => {

    const postId = post.post_id;
    const userId = post.user_id;

    const dispatch = useDispatch();

    const [greenActive, setGreenActive] = useState(true);
    const [redActive, setRedActive] = useState(true);
    const [visibility, setVisibility] = useState(true);

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

    useEffect(() => {
        const postId = post.post_id;
        dispatch(displayLikes(postId));

    }, [dispatch, post.post_id])
    
    const userData = useSelector((state) => state.userReducer);
    const likeData = useSelector((state) => state.postReducer);
    
    let objectUser = {};
    objectUser = userData.results[0];
    const imgUrl = post.image_url;

    if (likeData.post === undefined) {
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
                    <FontAwesomeIcon icon={faPen} />
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
                <div className="card-message">
                    <FontAwesomeIcon icon={ faPaperPlane } />
                    <span className="post-date">{post.created}</span>
                    <div className="post-content">
                        <div className='message'>{post.text}</div>
                        { (imgUrl) ? 
                            <div className='picture'>
                                <img src={imgUrl} alt="post utilisateur" />
                            </div>
                            : <div></div>}
                    </div>
                </div>
                <div className="card-likes-comments">
                <FontAwesomeIcon icon={ faMessage } onClick={toggleVisibility}/>
                <span>1 commentaire</span>
                {/* eslint-disable-next-line */}
                <FontAwesomeIcon className={"thumbs-up " + "post_id-green" + postId} icon={ faThumbsUp } onClick={toggleLike}/>
                <span className="post-like">{post.like_number} like</span>
                {/* eslint-disable-next-line */}
                <FontAwesomeIcon className={"thumbs-down " + "post_id-red" + postId} icon={ faThumbsDown } onClick={toggleDislike} />
                <span className="post-dislike">{post.dislike_number} dislike</span>
                </div>
            </div>
        </div>
        <Comments postId={postId}/>
        </>
    );
};

export default Card;