import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';
import { cancelLikePost, getAllPosts, likePost, updatePost } from '../../actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import InputComments from '../Profil/InputComments';
import { displayComments, hideComments } from '../Profil/Comments';


const CardHome = ({postsObject, allUsersResults, elt}) => {

    const dispatch = useDispatch();

    let isLiked = elt.isLiked;
    let isDisliked = elt.isDisliked;

    if (isLiked === 0) {
        isLiked = true;
    }
    else if (isLiked === 1) {
        isLiked = false;
    }

    if (isDisliked === 0) {
        isDisliked = true;
    }
    else if (isDisliked === 1) {
        isDisliked = false;
    }

    // console.log(isLiked);
    // console.log(isDisliked);

    const [greenActive, setGreenActive] = useState(isLiked);
    const [redActive, setRedActive] = useState(isDisliked);
    const [visibility, setVisibility] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const toggleVisibility = () => {
        
        const postId = elt.post_id;
        
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

    const updateItem = () => {
        
        const postId = elt.post_id;
        
        console.log(textUpdate);
        if(textUpdate) {
            dispatch(updatePost(postId, textUpdate))
                .then(() => setIsUpdated(false))
                .then(() => dispatch(getAllPosts()));
        }
    }

    function addLike() {
        const postId = elt.post_id;
        const postText = elt.text;
        console.log(postId);
        console.log(postText);
        
        console.log(`==> post liké : post_id ${postId}`);
        dispatch(likePost(postId, postText))
            .then(() => dispatch(getAllPosts()));
    }

    function removeLike() {
        const postId = elt.post_id;

        console.log(`==> like annulé : post_id ${postId}`);
        dispatch(cancelLikePost(postId))
            .then(() => dispatch(getAllPosts()));
    }

    const toggleLike = () => {

        console.log(greenActive);
        setGreenActive(!greenActive);
        
        if (greenActive === true) {
            
            addLike();
            const selectElt = document.querySelector(`.post_id-green${elt.post_id}`);
            selectElt.classList.add('active-green');

            // Ajout de l'id du post liké dans le local storage
            const likesArray = JSON.parse(localStorage.getItem('greenActiveHome') || '[]');
            likesArray.push(`.post_id-green${elt.post_id}`);
            localStorage.setItem('greenActiveHome', JSON.stringify(likesArray));

            // // Vérification si l'utilisateur a déjà disliké le post: si oui, on annule le dislike
            // const selectContainer = document.querySelector(`.post_id-red${postId}`);
            // if (selectContainer.classList.contains('active-red')) {
            //     toggleDislike();
            // }
        }

        else if (greenActive === false) {

            removeLike();
            const selectElt = document.querySelector(`.post_id-green${elt.post_id}`);
            selectElt.classList.remove('active-green');

            // Suppression de l'id du post liké dans le local storage
            const likesArray = JSON.parse(localStorage.getItem('greenActiveHome'));
            const index = likesArray.indexOf(`.post_id-green${elt.post_id}`);
            if (index >= 0) {
                likesArray.splice( index, 1 );
            }
            localStorage.setItem('greenActiveHome', JSON.stringify(likesArray));
        }
    };


    // const toggleDislike = () => {
    //     setRedActive(!redActive);
        
    //     if (redActive === true) {
    //         addDislike();
    //         const selectElt = document.querySelector(`.post_id-red${postId}`);
    //         selectElt.classList.add('active-red');

    //         // Ajout de l'id du post disliké dans le local storage
    //         const dislikesArray = JSON.parse(localStorage.getItem('redActive') || '[]');
    //         dislikesArray.push(`.post_id-red${postId}`);
    //         localStorage.setItem('redActive', JSON.stringify(dislikesArray));

    //         // Vérification si l'utilisateur a déjà liké le post: si oui, on annule le like
    //         const selectContainer = document.querySelector(`.post_id-green${postId}`);
    //         if (selectContainer.classList.contains('active-green')) {
    //             toggleLike();
    //         }
    //     }
    //     else if (redActive === false) {
    //         removeDislike();
    //         const selectElt = document.querySelector(`.post_id-red${postId}`);
    //         selectElt.classList.remove('active-red');

    //         // Suppression de l'id du post disliké dans le local storage
    //         const dislikesArray = JSON.parse(localStorage.getItem('redActive'));
    //         const index = dislikesArray.indexOf(`.post_id-red${postId}`);
    //         if (index >= 0) {
    //         dislikesArray.splice( index, 1 );
    //         }
    //         localStorage.setItem('redActive', JSON.stringify(dislikesArray));
    //     }
    // };
    
    // Récupération du cookie et décodage du token pour récupérer l'userId 
    const readCookie = document.cookie;
    const token = readCookie.split('jwt=')[1];
    const { decodedToken } = useJwt(token);
    let userId = {};

    if (decodedToken !== null) {
        userId = decodedToken.userId
    }

    const userData = useSelector((state) => state.userReducer);
    const userDataResults = userData.results;
    if(userDataResults === undefined) return;
    const objectUser = userDataResults[0];

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
        <>
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
                                    <button className='btn' onClick={updateItem}>Modifier</button>
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
                        <FontAwesomeIcon icon={ faMessage } onClick={toggleVisibility}/>
                        { (elt.comments_number > 1) ? <span>{elt.comments_number} commentaires</span> : <span>{elt.comments_number} commentaire</span> }
                        <FontAwesomeIcon icon={ faThumbsUp } className={`thumbs-up post_id-green${elt.post_id}`} onClick={toggleLike}/>
                        { (elt.like_number > 1) ? <span>{elt.like_number} likes</span> : <span>{elt.like_number} like</span> }
                        <FontAwesomeIcon icon={ faThumbsDown } className={`thumbs-down post_id-red${elt.post_id}`} />
                        { (elt.dislike_number > 1) ? <span>{elt.dislike_number} dislikes</span> : <span>{elt.dislike_number} dislike</span> }
                    </div>
                </div>
            </div>
            <div className={`input-comments-container input-post_id${elt.post_id}`}>
            <InputComments postId={elt.post_id} infoUser={objectUser} userId={elt.user_id}/>
            {/* {commentsArray.map((comment) => {
                if (comment.post_id === postId) {
                    
                    return (
                        // eslint-disable-next-line
                        <div className={"comments-container " + "post_id" + postId + " comment_id" + comment.comment_id} key={comment.comment_id}> 
                            <Comments postId={postId} 
                                comments={commentsArray}
                                userId={userId}
                                commentDate={comment.created}
                                commentText={comment.text}
                                commentId={comment.comment_id}
                                imgUrl={comment.image_url}
                                nbOfLikes={comment.like_number}
                                nbOfDislikes={comment.dislike_number} 
                                key={comment.comment_id} />
                        </div>
                    )
                }
                else {
                    return (null);
                }
            })} */}
            </div>
        </>
    );
};

export default CardHome;