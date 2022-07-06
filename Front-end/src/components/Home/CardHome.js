import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';
import { cancelDislikePost, cancelLikePost, deleteDislikePost, deleteLikePost, deletePicturePost, deletePost, dislikePost, getAllPosts, likePost, updatePost } from '../../actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import InputComments from '../Profil/InputComments';
import Comments, { displayComments, hideComments } from '../Profil/Comments';
import { getAllDislikes, getAllLikes } from '../../actions/user.actions';
import { getComments } from '../../actions/comment.actions';
let postId = {};
let isLiked = Boolean;
let isDisliked = Boolean;

const CardHome = ({postsObject, allUsersResults, elt}) => {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userReducer);
    const commentsData = useSelector((state) => state.commentsReducer);
    const likesData = useSelector((state) => state.allLikesReducer);
    const dislikesData = useSelector((state) => state.allDislikesReducer);

    const userDataResults = userData.results;
    const commentsDataResults = commentsData.results;
    const likesDataResults = likesData.results;
    const dislikesDataResults = dislikesData.results;  

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
        .then(() => dispatch(getAllDislikes(userId)))
            .then(() => dispatch(getAllPosts()));
    }

    function removeDislike() {
        console.log(`==> dislike annulé : post_id ${elt.post_id}`);
        dispatch(cancelDislikePost(elt.post_id))
        .then(() => dispatch(getAllDislikes(userId)))
            .then(() => dispatch(getAllPosts()));
    }   

    // eslint-disable-next-line
    const toggleLike = () => {

        if (isLiked === true) {
            
            addLike();
            const selectElt = document.querySelector(`.post_id-green${elt.post_id}`);
            selectElt.classList.add('active-green');

            // Vérification si l'utilisateur a déjà disliké le post: si oui, on annule le dislike
            const selectContainer = document.querySelector(`.post_id-red${elt.post_id}`);
            if (selectContainer.classList.contains('active-red')) {
                isDisliked = false;
                removeDislike();
            }
        }

        else if (isLiked === false) {

            removeLike();
            const selectElt = document.querySelector(`.post_id-green${elt.post_id}`);
            selectElt.classList.remove('active-green');

        }
    };

    // eslint-disable-next-line
    const toggleDislike = () => {
        
        if (isDisliked === true) {
            
            addDislike();
            const selectElt = document.querySelector(`.post_id-red${elt.post_id}`);
            selectElt.classList.add('active-red');

            // Vérification si l'utilisateur a déjà liké le post: si oui, on annule le like
            const selectContainer = document.querySelector(`.post_id-green${elt.post_id}`);
            console.log(selectContainer);
            if (selectContainer.classList.contains('active-green')) {
                isLiked = false;
                removeLike();
            }
        }
        else if (isDisliked === false) {
            removeDislike();
            const selectElt = document.querySelector(`.post_id-red${elt.post_id}`);
            selectElt.classList.remove('active-red');

        }
    };

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

    if(userDataResults === undefined || commentsDataResults === undefined || likesDataResults === undefined || dislikesDataResults === undefined) return;

    const objectUser = userDataResults[0];
    const userId = userDataResults[0].user_id;

    // Arrêt de la fonction si les props n'ont pas été reçues
    if (postsObject === undefined || allUsersResults === undefined || elt === undefined) return;
    
    for (let i in postsObject) {

        // On récupère les infos utilisateurs dont l'userID est présent dans les posts
        const filterUsersPosts = allUsersResults.filter((elt) => elt.user_id === postsObject[i].user_id);
        postId = postsObject[i].post_id;
        const selectCards = document.querySelector(`.post_id${postId}`);
        
        if (selectCards !== null) {
            const selectImg = selectCards.querySelector('.profil-pic');
            if(selectImg === null) return;
            selectImg.setAttribute('src', `${filterUsersPosts[0].profil_pic}`);

            const selectH3 = selectCards.querySelector('.user-name');
            selectH3.textContent = `${filterUsersPosts[0].first_name}, ${filterUsersPosts[0].last_name}`;

            const selectEmail = selectCards.querySelector('.email');
            selectEmail.textContent = `${filterUsersPosts[0].email}`;
        }
    }

    // Récupération de tous les likes qui ont été cochés par l'utilisateur
    const filterLikes = likesDataResults.filter((elt) => elt.isLiked === 1 && elt.user_id === userId);
    const likesUserId = filterLikes.map((elt) => elt.user_id);
    const likesPostId = filterLikes.map((elt) => elt.post_id); 

    // Récupération de tous les dislikes qui ont été cochés par l'utilisateur
    const filterDislikes = dislikesDataResults.filter((elt) => elt.isDisliked === 1 && elt.user_id === userId);
    const dislikesUserId = filterDislikes.map((elt) => elt.user_id);
    const dislikesPostId = filterDislikes.map((elt) => elt.post_id); 

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
                        {/* Si le tableau des likes contient isLiked = 1 ainsi que l'userId on ajoute la classe active-green */}
                        { (likesUserId.includes(userId) && likesPostId.includes(elt.post_id)) ? 
                            <FontAwesomeIcon icon={ faThumbsUp } className={`thumbs-up post_id-green${elt.post_id} active-green`} onClick={()=> {
                                isLiked = false;
                                console.log(isLiked);
                                toggleLike();
                            }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsUp } className={`thumbs-up post_id-green${elt.post_id}`}  onClick={()=> {
                                isLiked = true;
                                console.log(isLiked);
                                toggleLike();
                            }}/>
                        }
                        { (elt.like_number > 1) ? <span className="post-like">{elt.like_number} likes</span> : <span className="post-like">{elt.like_number} like</span> }
                        { (dislikesUserId.includes(userId) && dislikesPostId.includes(elt.post_id)) ? 
                            <FontAwesomeIcon icon={ faThumbsDown } className={`thumbs-down post_id-red${elt.post_id} active-red`} onClick={()=> {
                                isDisliked = false;
                                console.log(isDisliked);
                                toggleDislike();
                            }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsDown } className={`thumbs-down post_id-red${elt.post_id}`}  onClick={()=> {
                                isDisliked = true;
                                console.log(isDisliked);
                                toggleDislike();
                            }}/>
                        }
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