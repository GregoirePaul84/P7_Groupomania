import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown} from '@fortawesome/free-solid-svg-icons';

const Card = ({post}) => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};
    objectUser = userData.results[0];
    
    
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
                <div className="card-message">
                    <FontAwesomeIcon icon={ faPaperPlane } />
                    <span className="post-date">{post.created}</span>
                    <div className='message'>{post.text}</div>
                </div>
                <div className="card-likes-comments">
                <FontAwesomeIcon icon={ faMessage } />
                <FontAwesomeIcon className="thumbs-up" icon={ faThumbsUp } />
                <FontAwesomeIcon className="thumbs-down" icon={ faThumbsDown } />
                </div>
            </div>
        </div>
    );
};

export default Card;