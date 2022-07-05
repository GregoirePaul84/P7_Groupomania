import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';
import { cancelDislikePost, cancelLikePost, deleteDislikePost, deleteLikePost, deletePicturePost, deletePost, dislikePost, getAllPosts, likePost, updatePost } from '../../actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import InputComments from '../Profil/InputComments';
import Comments, { displayComments, hideComments } from '../Profil/Comments';
import { getAllLikes } from '../../actions/user.actions';
import { getComments } from '../../actions/comment.actions';

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
        const userId = elt.user_id;
        
        console.log(`==> post liké : post_id ${postId}`);
        dispatch(likePost(postId, postText))
            .then(() => dispatch(getAllLikes(userId)))
            .then(() => dispatch(getAllPosts()));
    }

    function removeLike() {
        const postId = elt.post_id;
        const userId = elt.user_id;

        console.log(`==> like annulé : post_id ${postId}`);
        dispatch(cancelLikePost(postId))
            .then(() => dispatch(getAllLikes(userId)))
            .then(() => dispatch(getAllPosts()));
    }

    function addDislike() {
        const postId = elt.post_id;

        console.log(`==> post disliké : post_id ${postId}`);
        dispatch(dislikePost(postId))
            .then(() => dispatch(getAllPosts()));
    }

    function removeDislike() {
        console.log(`==> dislike annulé : post_id ${elt.post_id}`);
        dispatch(cancelDislikePost(elt.post_id))
            .then(() => dispatch(getAllPosts()));
    }   

    // eslint-disable-next-line
    const toggleLike = () => {

        console.log(greenActive);
        setGreenActive(!greenActive);
        
        if (greenActive === true) {
            
            addLike();
            const selectElt = document.querySelector(`.post_id-green${elt.post_id}`);
            selectElt.classList.add('active-green');

            // Ajout de l'id du post liké dans le local storage
            const likesArray = JSON.parse(localStorage.getItem('greenActive') || '[]');
            likesArray.push(`.post_id-green${elt.post_id}`);
            localStorage.setItem('greenActive', JSON.stringify(likesArray));

            // Vérification si l'utilisateur a déjà disliké le post: si oui, on annule le dislike
            const selectContainer = document.querySelector(`.post_id-red${elt.post_id}`);
            if (selectContainer.classList.contains('active-red')) {
                toggleDislike();
            }
        }

        else if (greenActive === false) {

            removeLike();
            const selectElt = document.querySelector(`.post_id-green${elt.post_id}`);
            selectElt.classList.remove('active-green');

            // Suppression de l'id du post liké dans le local storage
            const likesArray = JSON.parse(localStorage.getItem('greenActive'));
            const index = likesArray.indexOf(`.post_id-green${elt.post_id}`);
            if (index >= 0) {
                likesArray.splice( index, 1 );
            }
            localStorage.setItem('greenActive', JSON.stringify(likesArray));
        }
    };

    // eslint-disable-next-line
    const toggleDislike = () => {
        setRedActive(!redActive);
        
        if (redActive === true) {
            addDislike();
            const selectElt = document.querySelector(`.post_id-red${elt.post_id}`);
            selectElt.classList.add('active-red');

            // Ajout de l'id du post disliké dans le local storage
            const dislikesArray = JSON.parse(localStorage.getItem('redActive') || '[]');
            dislikesArray.push(`.post_id-red${elt.post_id}`);
            localStorage.setItem('redActive', JSON.stringify(dislikesArray));

            // Vérification si l'utilisateur a déjà liké le post: si oui, on annule le like
            const selectContainer = document.querySelector(`.post_id-green${elt.post_id}`);
            if (selectContainer.classList.contains('active-green')) {
                toggleLike();
            }
        }
        else if (redActive === false) {
            removeDislike();
            const selectElt = document.querySelector(`.post_id-red${elt.post_id}`);
            selectElt.classList.remove('active-red');

            // Suppression de l'id du post disliké dans le local storage
            const dislikesArray = JSON.parse(localStorage.getItem('redActive'));
            const index = dislikesArray.indexOf(`.post_id-red${elt.post_id}`);
            if (index >= 0) {
            dislikesArray.splice( index, 1 );
            }
            localStorage.setItem('redActive', JSON.stringify(dislikesArray));
        }
    };


    useEffect(() => {
        
        const likesArray = JSON.parse(localStorage.getItem('greenActive'));
        
        for (let i in likesArray) {
            const selectElt = document.querySelector(likesArray[i]);
    
            if (selectElt !== null) {
                selectElt.classList.add('active-green');
            }
        }

        const dislikesArray = JSON.parse(localStorage.getItem('redActive'));
        
        for (let j in dislikesArray) {
            const selectElt = document.querySelector(dislikesArray[j]);
    
            if (selectElt !== null) {
                selectElt.classList.add('active-red');
            }
        }
    
    }, [toggleLike, toggleDislike])

    useEffect(() => {
        dispatch(getComments());
    // eslint-disable-next-line
    }, []);

    // Suppression du post: suppression des likes / dislikes et de l'image de la DB
    const deleteArticle = () => {
        const postId = elt.post_id;

        dispatch(deletePost(postId))
            .then(() => dispatch(deletePicturePost(postId)))
            .then(() => dispatch(deleteLikePost(postId)))
            .then(() => dispatch(deleteDislikePost(postId)))
            .then(() => dispatch(getAllPosts()));
    }

    const userData = useSelector((state) => state.userReducer);
    const commentsData = useSelector((state) => state.commentsReducer);

    const userDataResults = userData.results;
    const commentsDataResults = commentsData.results;

    if(userDataResults === undefined || commentsDataResults === undefined) return;

    const objectUser = userDataResults[0];
    const userId = userDataResults[0].user_id;

    // Arrêt de la fonction si les props n'ont pas été reçues
    if (postsObject === undefined || allUsersResults === undefined || elt === undefined) return;
    console.log(postsObject);
    for (let i in postsObject) {

        // On récupère les infos utilisateurs dont l'userID est présent dans les posts
        const filterUsersPosts = (allUsersResults.filter((elt) => elt.user_id === postsObject[i].user_id));
        const postId = postsObject[i].post_id;
        const selectCards = document.querySelector(`.post_id${postId}`);
        
        if (selectCards !== null) {
            const selectImg = selectCards.querySelector('.profil-pic');
            // selectImg.setAttribute('src', `${filterUsersPosts[0].profil_pic}`);

            const selectH3 = selectCards.querySelector('.user-name');
            // selectH3.textContent = `${filterUsersPosts[0].first_name}, ${filterUsersPosts[0].last_name}`;

            const selectEmail = selectCards.querySelector('.email');
            // selectEmail.textContent = `${filterUsersPosts[0].email}`;
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
                        <FontAwesomeIcon icon={faTrashCan}  onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?'))
                            { deleteArticle() }
                        }} />
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
                        { (elt.like_number > 1) ? <span className="post-like">{elt.like_number} likes</span> : <span className="post-like">{elt.like_number} like</span> }
                        <FontAwesomeIcon icon={ faThumbsDown } className={`thumbs-down post_id-red${elt.post_id}`} onClick={toggleDislike}/>
                        { (elt.dislike_number > 1) ? <span className="post-dislike">{elt.dislike_number} dislikes</span> : <span className="post-dislike">{elt.dislike_number} dislike</span> }
                    </div>
                </div>
            </div>
            <div className={`input-comments-container input-post_id${elt.post_id}`}>
            <InputComments postId={elt.post_id} infoUser={objectUser} userId={elt.user_id}/>
            {commentsDataResults.map((comment) => {
                if (comment.post_id === elt.post_id) {
                    
                    return (
                        // eslint-disable-next-line
                        <div className={"comments-container " + "post_id" + elt.post_id + " comment_id" + comment.comment_id} key={comment.comment_id}> 
                            <Comments postId={elt.postId} 
                                comments={commentsDataResults}
                                userId={elt.user_id}
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
            })}
            </div>
        </>
    );
};

export default CardHome;