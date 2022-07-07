import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { likePost, cancelLikePost, dislikePost, cancelDislikePost, deletePost, updatePost, deletePicturePost, deleteLikePost, deleteDislikePost } from '../../actions/post.actions';
import Comments, {displayComments, hideComments} from './Comments';
import InputComments from './InputComments';
import { getComments} from '../../actions/comment.actions';
import { getUserPosts } from '../../actions/user_posts.actions';
import { convertTime } from '../../App';
import { getAllLikes } from '../../actions/user.actions';
let isLiked = Boolean;
let isDisliked = Boolean;

const Card = ({post}) => {
    const postId = post.post_id;
    const userId = post.user_id;
    const isoDate = post.created;
    const postText = post.text;
    
    const dispatch = useDispatch();

    const [visibility, setVisibility] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showPicture, setShowPicture] = useState(false);

    const userData = useSelector((state) => state.userReducer);
    const commentsData = useSelector((state) => state.commentsReducer);

    let objectUser = {};
    objectUser = userData.results[0];
    const imgUrl = post.image_url;
    const commentsArray = commentsData.results;
    const numberOfComments = post.comments_number;
    const numberOfLikes = post.like_number;
    const numberOfDislikes = post.dislike_number;

    const updateItem = () => {
        if(textUpdate) {
            dispatch(updatePost(postId, textUpdate))
                .then(() => setIsUpdated(false))
                .then(() => dispatch(getUserPosts(userId)));
        }
    }

    function addLike() {
        console.log(`==> post liké : post_id ${postId}`);
        dispatch(likePost(postId, postText))
            .then(() => dispatch(getUserPosts(userId)));
    }

    function removeLike() {
        console.log(`==> like annulé : post_id ${postId}`);
        dispatch(cancelLikePost(postId))
            .then(() => dispatch(getUserPosts(userId)));
    }

    function addDislike() {
        console.log(`==> post disliké : post_id ${postId}`);
        dispatch(dislikePost(postId))
            .then(() => dispatch(getUserPosts(userId)));
    }

    function removeDislike() {
        console.log(`==> dislike annulé : post_id ${postId}`);
        dispatch(cancelDislikePost(postId))
            .then(() => dispatch(getUserPosts(userId)));
    }   

    // eslint-disable-next-line
    const toggleLike = () => {

        if (isLiked === true) {
            
            isLiked = false;
            addLike();
            const selectElt = document.querySelector(`.post_id-green${postId}`);
            selectElt.classList.add('active-green');

            // Vérification si l'utilisateur a déjà disliké le post: si oui, on annule le dislike
            const selectContainer = document.querySelector(`.post_id-red${postId}`);
            if (selectContainer.classList.contains('active-red')) {
                isDisliked = false;
                removeDislike();
            }
        }

        else if (isLiked === false) {

            isLiked = true;
            removeLike();
            const selectElt = document.querySelector(`.post_id-green${postId}`);
            selectElt.classList.remove('active-green');
        }
    };

    // eslint-disable-next-line
    const toggleDislike = () => {
        
        if (isDisliked === true) {
            addDislike();
            const selectElt = document.querySelector(`.post_id-red${postId}`);
            selectElt.classList.add('active-red');

            // Vérification si l'utilisateur a déjà liké le post: si oui, on annule le like
            const selectContainer = document.querySelector(`.post_id-green${postId}`);
            if (selectContainer.classList.contains('active-green')) {
                isLiked = false;
                removeLike();
            }
        }
        else if (isDisliked === false) {
            removeDislike();
            const selectElt = document.querySelector(`.post_id-red${postId}`);
            selectElt.classList.remove('active-red');

        }
    };


    const toggleVisibility = () => {
        
        setVisibility(!visibility);
        if (visibility) {
            displayComments(postId);
        }
        else {
            hideComments(postId);
        }
    }


    // Suppression du post: suppression des likes / dislikes et de l'image de la DB
    const deleteArticle = () => {
        dispatch(deletePost(postId))
            .then(() => dispatch(deletePicturePost(postId)))
            .then(() => dispatch(deleteLikePost(postId)))
            .then(() => dispatch(deleteDislikePost(postId)))
            .then(() => dispatch(getUserPosts(userId)));
    }   

    useEffect(() => {
        dispatch(getUserPosts(userId));
        dispatch(getComments());
        dispatch(getAllLikes(userId));
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(showPicture) {

            // Création de la modale image de post
            const createDiv = document.createElement("div");
            createDiv.className = "picture-modal";
            
            const selectRoot = document.getElementById('root');
            selectRoot.appendChild(createDiv);
            
            const createImg = document.createElement("img");
            createImg.setAttribute("src", `${imgUrl}`);
            
            const selectPictureModal = document.querySelector('.picture-modal');
            selectPictureModal.appendChild(createImg);
            
            const createCrossSpan = document.createElement("span");
            createCrossSpan.className = "cross-span";
            createCrossSpan.textContent = "x";
            selectPictureModal.appendChild(createCrossSpan);

            document.querySelector('.profil-page').style.filter = "blur(5px)";

            // Ecoute du clic pour fermer la modale en cas de clic extérieur
            createCrossSpan.onclick = function() {  
                setShowPicture(false);
            }
        }
        
        if(showPicture === false && document.querySelector('.picture-modal') !== null) {

            const selectPictureModal = document.querySelector('.picture-modal');
            selectPictureModal.remove();

            document.querySelector('.profil-page').style.filter = "blur(0)";
        }

    // eslint-disable-next-line
    }, [showPicture]);

    useEffect(() => {
        dispatch(getAllLikes());
    // eslint-disable-next-line
    }, [])

    if (commentsArray === undefined) {
        return;
    }
    console.log(numberOfComments);
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
                    <FontAwesomeIcon icon={faPen} onClick={() => setIsUpdated(!isUpdated)}/>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?'))
                            { deleteArticle() }
                    }} />
                </div>
                <div className="card-message">
                    <FontAwesomeIcon icon={ faPaperPlane } />
                    <span className="post-date">{convertTime(isoDate)}</span>
                    <div className="post-content">
                        {isUpdated === false && <div className='message'>{post.text}</div>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    className="update-content"
                                    defaultValue={post.text}
                                    onChange={ (e) => setTextUpdate(e.target.value)}
                                />
                                <div className="update-button">
                                    <button className='btn' onClick={updateItem}>Modifier</button>
                                </div>
                            </div>
                        )}
                        { (imgUrl) ? 
                            <div className='picture' onClick={ (e) => setShowPicture(!showPicture)}>
                                <img src={imgUrl} alt="post utilisateur" />
                            </div>
                            : <div></div>}
                    </div>
                </div>
                <div className="card-likes-posts">
                <FontAwesomeIcon icon={ faMessage } onClick={toggleVisibility}/>
                { (numberOfComments > 1) ? <span>{numberOfComments} commentaires</span> : <span>{numberOfComments} commentaire</span> }
                { (post.isLiked === 1) ? 
                            <FontAwesomeIcon icon={ faThumbsUp } className={`thumbs-up post_id-green${postId} active-green`} onClick={()=> {
                                isLiked = false;
                                console.log(isLiked);
                                toggleLike();
                            }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsUp } className={`thumbs-up post_id-green${postId}`}  onClick={()=> {
                                isLiked = true;
                                console.log(isLiked);
                                toggleLike();
                            }}/>
                }
                { (numberOfLikes > 1) ? <span className="post-like">{numberOfLikes} likes</span> : <span className="post-like">{numberOfLikes} like</span> }
                { (post.isDisliked === 1) ? 
                            <FontAwesomeIcon icon={ faThumbsDown } className={`thumbs-down post_id-red${postId} active-red`} onClick={()=> {
                                isDisliked = false;
                                console.log(isDisliked);
                                toggleDislike();
                            }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsDown } className={`thumbs-down post_id-red${postId}`}  onClick={()=> {
                                isDisliked = true;
                                console.log(isDisliked);
                                toggleDislike();
                            }}/>
                }
                { (numberOfDislikes > 1) ? <span className="post-dislike">{numberOfDislikes} dislikes</span> : <span className="post-dislike">{numberOfDislikes} dislike</span> }
                </div>
            </div>
        </div>
        {/* eslint-disable-next-line */}
        <div className={"input-comments-container " + "input-post_id" + postId}>
            <InputComments postId={postId} infoUser={objectUser} userId={userId}/>
            {commentsArray.map((comment) => {
                if (comment.post_id === postId) {
                    
                    return (
                        // eslint-disable-next-line
                        <div className={"comments-container " + "post_id" + postId + " comment_id" + comment.comment_id} key={comment.comment_id}> 
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

export default Card;