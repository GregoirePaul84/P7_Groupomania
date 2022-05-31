import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { displayLikes, likePost } from '../../actions/post.actions';

const Card = ({post}) => {

    const dispatch = useDispatch();

    function addLike() {
        const postId = post.post_id;
        console.log("==> post liké");
        console.log(postId);
        dispatch(likePost(postId));
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
    else {
        console.log(post);
    }
    
    return (
        
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
                <FontAwesomeIcon icon={ faMessage } />
                <span>1 commentaire</span>
                <FontAwesomeIcon className="thumbs-up" icon={ faThumbsUp } onClick={ addLike }/>
                <span className="post-like">{post.like_number} like</span>
                <FontAwesomeIcon className="thumbs-down" icon={ faThumbsDown } />
                <span className="post-dislike">{post.dislike_number} dislike</span>
                </div>
            </div>
        </div>
    );
};

export default Card;