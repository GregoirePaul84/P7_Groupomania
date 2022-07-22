import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';
import Comments, { displayComments, hideComments } from './Comments';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../../actions/comment.actions';

const FriendCard = ({post, objectUser}) => {

    const dispatch = useDispatch();

    const [visibility, setVisibility] = useState(true);

    const toggleVisibility = () => {
        
        const postId = post.post_id;
        
        setVisibility(!visibility);
        if (visibility) {
            console.log(visibility);
            displayComments(postId);
        }
        else {
            console.log(visibility);
            hideComments(postId);
        }
    }

    useEffect(() => {
        dispatch(getComments());
    // eslint-disable-next-line
    }, [])

    const commentsData = useSelector((state) => state.commentsReducer);

    const commentsDataResults = commentsData.results;

    if(commentsDataResults === undefined) return;
    
    return (
        <>
            <div className={`card-container post_id${post.post_id}`} key={post.post_id}> 
                <div className="card-smallContainer">
                    <div className="card-user-picture">
                        <img alt="utilisateur" src={objectUser.profil_pic} className="profil-pic"/>
                    </div>
                    <div className="card-name-user">
                        <h3 className='user-name'>{objectUser.first_name}, {objectUser.last_name}</h3>
                        <p className='email'>{objectUser.email}</p>
                    </div>
                    <div className="card-message">
                        <FontAwesomeIcon icon={ faPaperPlane } />
                        <span className="post-date">{convertTime(post.created)}</span>
                        <div className="post-content">
                            <div className='message'>{post.text}</div>
                            { (post.image_url !== null) ? 
                            <div className='picture'>
                                <img src={post.image_url} alt="post utilisateur" />
                            </div>
                            : <div></div>}
                        </div>
                    </div>
                    <div className="card-likes-posts">   
                        <FontAwesomeIcon icon={ faMessage } onClick={toggleVisibility} />
                        { (post.comments_number > 1) ? <span>
                                                            {post.comments_number} 
                                                            <span className="comment-text"> commentaires</span>
                                                        </span> 
                                                        : 
                                                        <span>
                                                            {post.comments_number} 
                                                            <span className="comment-text"> commentaire</span>
                                                        </span> }
                        { (post.like_number > 1) ? <span className='post-like'>
                                                        {post.like_number} likes
                                                    </span> 
                                                    : 
                                                    <span className='post-like'>
                                                        {post.like_number} like
                                                    </span> }
                        { (post.dislike_number > 1) ? <span className='post-dislike'>
                                                        {post.dislike_number} dislikes
                                                    </span> 
                                                    : 
                                                    <span className='post-dislike'>
                                                        {post.dislike_number} dislike
                                                    </span> }
                    </div>
                </div>
            </div>
            <div className={`input-comments-container input-post_id${post.post_id}`}>
                {commentsDataResults.map((comment) => {
                    if (comment.post_id === post.post_id) {
                        
                        return (
                            // eslint-disable-next-line
                            <div className={"comments-container " + "post_id" + post.post_id + " comment_id" + comment.comment_id} key={comment.comment_id}> 
                                <Comments comment={comment} />
                            </div>
                        )
                    }
                    else {
                        return (null);
                    }
                })}
            </div>
        </>
    );
};

export default FriendCard;