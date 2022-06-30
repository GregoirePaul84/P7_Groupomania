import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPaperPlane, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';

const FriendCard = ({post, objectUser}) => {
    
    return (
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
                    <FontAwesomeIcon icon={ faMessage } />
                    { (post.comments_number > 1) ? <span>{post.comments_number} commentaires</span> : <span>{post.comments_number} commentaire</span> }
                    <FontAwesomeIcon icon={ faThumbsUp } />
                    { (post.like_number > 1) ? <span>{post.like_number} likes</span> : <span>{post.like_number} like</span> }
                    <FontAwesomeIcon icon={ faThumbsDown } />
                    { (post.dislike_number > 1) ? <span>{post.dislike_number} dislikes</span> : <span>{post.dislike_number} dislike</span> }
                </div>
            </div>
        </div>
    );
};

export default FriendCard;