import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faMessage, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { deletePost, updatePost, deletePicturePost, deleteLikePost, deleteDislikePost } from '../../actions/post.actions';
import Comments, {displayComments, hideComments} from './Comments';
import InputComments from './InputComments';
import { getComments} from '../../actions/comment.actions';
import { getUserPosts } from '../../actions/user_posts.actions';
import { convertTime } from '../../App';
import { getAllDislikes, getAllLikes } from '../../actions/user.actions';


const Card = ({post}) => {
    const postId = post.post_id;
    const userId = post.user_id;
    const isoDate = post.created;
    
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
        dispatch(getAllDislikes(userId));
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
    
    return (
        <>
        <div className="card-container">
            <div className="card-smallContainer">
                <div className="card-user-picture">
                    <img src={objectUser.profil_pic} alt="utilisateur" />
                </div>
                <div className="card-name-user">
                    <h3 className='user-name'>{objectUser.first_name}, {objectUser.last_name}</h3>
                    <p className='email'>{objectUser.email}</p>
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
                { (numberOfComments > 1) ? <span>{numberOfComments} 
                                                <span className="comment-text"> commentaires</span>
                                            </span> 
                                            : 
                                            <span>{numberOfComments} 
                                                <span className="comment-text"> commentaire</span>
                                            </span> }
                { (numberOfLikes > 1) ? <span className="post-like">{numberOfLikes} 
                                            <span className="like-text"> likes</span>
                                        </span> 
                                        : 
                                        <span className="post-like">{numberOfLikes} 
                                            <span className="like-text"> like</span>
                                        </span> 
                                        }
                { (numberOfDislikes > 1) ? <span className="post-dislike">{numberOfDislikes} 
                                                <span className="dislike-text"> dislikes</span>
                                            </span> 
                                            : 
                                            <span className="post-dislike">{numberOfDislikes} 
                                                <span className="dislike-text"> dislike</span>
                                            </span> }
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