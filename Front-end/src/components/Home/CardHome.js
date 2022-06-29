import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';

const CardHome = ({postsObject, allUsersResults, elt}) => {

    // const [greenActive, setGreenActive] = useState(true);
    // const [redActive, setRedActive] = useState(true);
    // const [visibility, setVisibility] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    // const [showPicture, setShowPicture] = useState(false);
    console.log(postsObject);
    console.log(allUsersResults);
    console.log(elt);

    // Arrêt de la fonction si les props n'ont pas été reçues
    if (postsObject === undefined || allUsersResults === undefined || elt === undefined) return;
    
    let imgUrl = null;

    for (let i in postsObject) {

        imgUrl = postsObject[i].image_url;

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
    

    const updateItem = () => {
        // if(textUpdate) {
        //     dispatch(updatePost(postId, textUpdate, userId))
        //         .then(() => setIsUpdated(false))
        //         .then(() => dispatch(getUserPosts(userId)));
        // }
    }

    return (
        <div className={`card-container post_id${elt.post_id}`} key={elt.post_id}> 
            <div className="card-smallContainer">
                <div className="card-user-picture">
                    <img alt="utilisateur" src={""} className="profil-pic"/>
                </div>
                <div className="card-name-user">
                    <h3 className='user-name'></h3>
                    <p className='email'></p>
                </div>
                <div className="modify-delete">
                    <FontAwesomeIcon icon={faPen} onClick={() => setIsUpdated(!isUpdated)}/>
                    <FontAwesomeIcon icon={faTrashCan} />
                </div>
                <div className="card-message">
                    <FontAwesomeIcon icon={ faPaperPlane } />
                    <span className="post-date">{convertTime(elt.created)}</span>
                    <div className="post-content">
                        {isUpdated === false && <div className='message'>{elt.text}</div>}
                        {isUpdated && (
                        <div className="update-post">
                            <textarea
                                className="update-content"
                                defaultValue={""}
                                onChange={ (e) => setTextUpdate(e.target.value)}
                            />
                            <div className="update-button">
                                <button className='btn' onClick={updateItem}>Modifier</button>
                            </div>
                        </div>
                        )}
                    </div>
                    {/* { (imgUrl) ? 
                    <div className='picture'>
                        <img src={imgUrl} alt="post utilisateur" />
                    </div>
                    : <div></div>} */}
                </div>
                <div className="card-likes-posts">
                    <FontAwesomeIcon icon={ faMessage } />
                    <FontAwesomeIcon icon={ faThumbsUp } />
                    <FontAwesomeIcon icon={ faThumbsDown } />
                </div>
            </div>
        </div>
    );
};

export default CardHome;