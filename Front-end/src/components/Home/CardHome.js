import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';
import { getAllPosts, updatePost } from '../../actions/post.actions';
import { useDispatch } from 'react-redux';

const CardHome = ({postsObject, allUsersResults, elt}) => {

    const dispatch = useDispatch;

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const updateItem = (elt) => {
        console.log(elt.post_id);
        const postId = elt.post_id;
        
        console.log(textUpdate);
        if(textUpdate) {
            dispatch(updatePost(postId, textUpdate))
                .then(() => setIsUpdated(false))
                .then(() => dispatch(getAllPosts()));
        }
    }
    
    // Récupération du cookie et décodage du token pour récupérer l'userId 
    const readCookie = document.cookie;
    const token = readCookie.split('jwt=')[1];
    const { decodedToken } = useJwt(token);
    let userId = {};

    if (decodedToken !== null) {
        userId = decodedToken.userId
    }

    // Arrêt de la fonction si les props n'ont pas été reçues
    if (postsObject === undefined || allUsersResults === undefined || elt === undefined) return;

    for (let i in postsObject) {

        // On récupère les infos utilisateurs dont l'userID est présente dans les posts
        const filterUsersPosts = (allUsersResults.filter((elt) => elt.user_id === postsObject[i].user_id));
        const postId = postsObject[i].post_id;
        const selectCards = document.querySelector(`.post_id${postId}`);
        
        if (selectCards !== null) {
            const selectImg = selectCards.querySelector('.profil-pic');
            selectImg.setAttribute('src', `${filterUsersPosts[0].profil_pic}`);

            const selectH3 = selectCards.querySelector('.user-name');
            selectH3.textContent = `${filterUsersPosts[0].first_name}, ${filterUsersPosts[0].last_name}`;

            const selectEmail = selectCards.querySelector('.email');
            selectEmail.textContent = `${filterUsersPosts[0].email}`;
        }
    }

    
    return (
        <div className={`card-container post_id${elt.post_id}`} key={elt.post_id}> 
            <div className="card-smallContainer">
                <div className="card-user-picture">
                    <img alt="utilisateur" src={""} className="profil-pic"/>
                </div>
                <div className="card-name-user">
                    <h3 className='user-name'>{"userName"}</h3>
                    <p className='email'></p>
                </div>
                {/* Si le token décodé est égal à l'userId du post, on permet la modification / suppression */}
                { (userId === elt.user_id) ? 
                <div className="modify-delete">
                    <FontAwesomeIcon icon={faPen} onClick={() => setIsUpdated(!isUpdated)}/>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
                : null
                }
                <div className="card-message">
                    <FontAwesomeIcon icon={ faPaperPlane } />
                    <span className="post-date">{convertTime(elt.created)}</span>
                    <div className="post-content">
                        {isUpdated === false && <div className='message'>{elt.text}</div>}
                        {isUpdated && (
                        <div className="update-post">
                            <textarea
                                className="update-content"
                                defaultValue={elt.text}
                                onChange={ (e) => setTextUpdate(e.target.value)}
                            />
                            <div className="update-button">
                                <button className='btn' onClick={updateItem(elt)}>Modifier</button>
                            </div>
                        </div>
                        )}
                    </div>
                    { (elt.image_url !== null) ? 
                    <div className='picture'>
                        <img src={elt.image_url} alt="post utilisateur" />
                    </div>
                    : <div></div>}
                </div>
                <div className="card-likes-posts">   
                    <FontAwesomeIcon icon={ faMessage } />
                    { (elt.comments_number > 1) ? <span>{elt.comments_number} commentaires</span> : <span>{elt.comments_number} commentaire</span> }
                    <FontAwesomeIcon icon={ faThumbsUp } />
                    { (elt.like_number > 1) ? <span>{elt.like_number} likes</span> : <span>{elt.like_number} like</span> }
                    <FontAwesomeIcon icon={ faThumbsDown } />
                    { (elt.dislike_number > 1) ? <span>{elt.dislike_number} dislikes</span> : <span>{elt.dislike_number} dislike</span> }
                </div>
            </div>
        </div>
    );
};

export default CardHome;