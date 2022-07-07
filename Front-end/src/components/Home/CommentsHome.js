import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/user.actions';
import { convertTime } from '../../App';
import { cancelDislikeComment, cancelLikeComment, decreaseNbOfComments, deleteComment, deleteDislikeComment, deleteLikeComment, deletePictureComment, dislikeComment, getComments, likeComment, updateComment} from '../../actions/comment.actions';
import { getUserPosts } from '../../actions/user_posts.actions';
import { getAllPosts } from '../../actions/post.actions';
let isLiked = Boolean;
let isDisliked = Boolean;

const CommentsHome = (props) => {

    const dispatch = useDispatch();
    const comments = props.comments;
    const commentId = props.commentId;
    const likeNumber = props.nbOfLikes;
    const dislikeNumber = props.nbOfDislikes;
    const commentText = props.commentText;
    const imgUrl = props.imgUrl;
    const commentDate = props.commentDate;
    const comment = props.comment;
    const postId = comment.post_id;

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const userData = useSelector((state) => state.userReducer);
    const allUsersData = useSelector((state) => state.userAllReducer);
    const likesData = useSelector((state) => state.allLikesReducer);
    const dislikesData = useSelector((state) => state.allDislikesReducer);

    const userResults = userData.results;
    const usersResults = allUsersData.results;
    const likesDataResults = likesData.results;
    const dislikesDataResults = dislikesData.results;  

    const updateItem = () => {
        if(textUpdate) {
            console.log(textUpdate);
            dispatch(updateComment(commentId, textUpdate))
                .then(() => setIsUpdated(false))
                .then(() => dispatch(getComments()));
        }
    }
    
    useEffect(() => {

        dispatch(getAllUsers());

    // eslint-disable-next-line    
    }, []);

    
    useEffect(() => {
        for (let j in comments) {

            if (usersResults !== undefined) {
                const findUserById = usersResults.find(x => x.user_id === comments[j].user_id);
        
                const selectComment = document.querySelector('.comment_id'+commentId);
                const selectImgBox = selectComment.querySelector('.user-picture');
                selectImgBox.setAttribute('src', findUserById.profil_pic)

                const selectName = selectComment.querySelector('h3');
                selectName.textContent = findUserById.first_name + ', ' + findUserById.last_name;

                const selectEmail = selectComment.querySelector('p');
                selectEmail.textContent = findUserById.email;

                const selectDate = selectComment.querySelector('.comment-date');
                const transformedDate = convertTime(commentDate);
                selectDate.textContent = transformedDate;

                if (commentText !== null) {
                    const selectMessageBox = selectComment.querySelector('.message');
                    selectMessageBox.textContent = `${commentText}`; 
                }

                if (imgUrl !== null) {
                    const selectPic = selectComment.querySelector('.comment-img');
                    selectPic.setAttribute('src', imgUrl);
                }

                const selectThumbUp = selectComment.querySelector('.thumbs-up');
                selectThumbUp.classList.add('comment_id-green' + commentId);

                const selectThumbDown = selectComment.querySelector('.thumbs-down');
                selectThumbDown.classList.add('comment_id-red' + commentId);
            }
            
        }
    // eslint-disable-next-line
    }, [usersResults]);

    function addLike() {

        console.log(`==> commentaire liké : comment_id ${commentId}`);
        dispatch(likeComment(commentId))
            .then(() => dispatch(getComments()));
    }

    function removeLike() {
        console.log(`==> like annulé : comment_id ${commentId}`);
        dispatch(cancelLikeComment(commentId))
            .then(() => dispatch(getComments()));
    }

    // eslint-disable-next-line
    const toggleLike = () => {

        const selectLike = document.querySelector(`.comment_id-green${commentId}`);
        const checkColor = selectLike.classList.contains('active-green');

        if (checkColor) {
            isLiked = false;
        }
        else {
            isLiked = true;
        }
            
        if (isLiked === true) {
            addLike();
            const selectElt = document.querySelector(`.comment_id-green${commentId}`);
            selectElt.classList.add('active-green');

            // Vérification si l'utilisateur a déjà disliké le commentaire: si oui, on annule le dislike
            const selectContainer = document.querySelector(`.comment_id-red${commentId}`);
            if (selectContainer.classList.contains('active-red')) {
                isDisliked = false;
                toggleDislike();
            }
        }
        else if (isLiked === false) {
            removeLike();
            const selectElt = document.querySelector(`.comment_id-green${commentId}`);
            selectElt.classList.remove('active-green');
        }
    };

    function addDislike() {
        console.log(`==> comment disliké : comment_id ${commentId}`);
        dispatch(dislikeComment(commentId))
            .then(() => dispatch(getComments()));
    }

    function removeDislike() {
        console.log(`==> dislike annulé : comment_id ${commentId}`);
        dispatch(cancelDislikeComment(commentId))
            .then(() => dispatch(getComments()));
    }   

    // eslint-disable-next-line
    const toggleDislike = () => {

        const selectDislike = document.querySelector(`.comment_id-red${commentId}`);
        const checkColor = selectDislike.classList.contains('active-red');

        if (checkColor) {
            isDisliked = false;
        }
        else {
            isDisliked = true;
        }

        if (isDisliked === true) {
            addDislike();
            const selectElt = document.querySelector(`.comment_id-red${commentId}`);
            selectElt.classList.add('active-red');

            // Vérification si l'utilisateur a déjà liké le commentaire: si oui, on annule le like
            const selectContainer = document.querySelector(`.comment_id-green${commentId}`);
            if (selectContainer.classList.contains('active-green')) {
                isLiked = false;
                toggleLike();
            }
        }
        else if (isDisliked=== false) {
            removeDislike();
            const selectElt = document.querySelector(`.comment_id-red${commentId}`);
            selectElt.classList.remove('active-red');
        }
    };

    if(likesDataResults === undefined || dislikesDataResults === undefined || userResults === undefined) return;

    const userId = userResults[0].user_id;
    console.log(postId);

    const deleteCom = () => {
        dispatch(deleteComment(commentId, postId))
            .then(() => dispatch(decreaseNbOfComments(postId)))
            .then(() => dispatch(deletePictureComment(commentId)))
            .then(() => dispatch(deleteLikeComment(commentId)))
            .then(() => dispatch(deleteDislikeComment(commentId)))
            .then(() => dispatch(getComments()))
            .then(() => dispatch(getAllPosts()));
    }

    // Récupération de tous les likes qui ont été cochés par l'utilisateur
    const filterLikes = likesDataResults.filter((elt) => elt.isLiked === 1 && elt.user_id === userId);
    const likesUserId = filterLikes.map((elt) => elt.user_id);
    const likesCommentId = filterLikes.map((elt) => elt.comment_id); 
    console.log(likesUserId);

    // Récupération de tous les dislikes qui ont été cochés par l'utilisateur
    const filterDislikes = dislikesDataResults.filter((elt) => elt.isDisliked === 1 && elt.user_id === userId);
    const dislikesUserId = filterDislikes.map((elt) => elt.user_id);
    const dislikesCommentId = filterDislikes.map((elt) => elt.comment_id); 
    console.log(likesUserId);
        
    return (
        
            <div className="flex-container">
                <div className="comments-smallContainer">
                    <div className="comment-user-picture">
                        <img className="user-picture" src={"profil_pic"} alt="utilisateur" />
                    </div>
                    <div className="comment-name-user">
                        <h3>{"first_name"}, {"last_name"}</h3>
                        <p>{"email"}</p>
                    </div>
                    <div className="modify-delete">
                        <FontAwesomeIcon className="pen" icon={faPen} 
                        onClick={() => setIsUpdated(!isUpdated)}/>
                        <FontAwesomeIcon className="garbage" icon={faTrashCan} 
                        onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?'))
                            { deleteCom() }
                        }} />
                    </div>
                    <div className="comment-message-box">
                        <FontAwesomeIcon icon={ faPaperPlane } />
                        <span className="comment-date">{""}</span>
                        <div className="comment-content">
                            {isUpdated === false && 
                                <div className='message'>{commentText}</div>
                            }
                            {isUpdated && (
                                <div className="update-comment">
                                    <textarea
                                        className="update-content"
                                        defaultValue={commentText}
                                        onChange={ (e) => setTextUpdate(e.target.value)}
                                    />
                                    <div className="update-button">
                                        <button className='btn' onClick={updateItem}>Modifier</button>
                                    </div>
                                </div>
                            )}
                            { (imgUrl) ? 
                                <div className='comment-picture'>
                                    <img src="" alt="commentaire" className='comment-img'/>
                                </div>
                                : <div></div>}
                        </div>
                    </div>
                    <div className="comments-likes">
                        { (likesCommentId.includes(commentId) && likesUserId.includes(userId)) ? 
                            <FontAwesomeIcon icon={ faThumbsUp } className={"thumbs-up comment active-green"} onClick={()=> {
                                toggleLike();
                            }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsUp } className={"thumbs-up comment"}  onClick={()=> {
                                toggleLike();
                            }}/>
                        }
                        { (likeNumber > 1) ? <span className="comment-like">{likeNumber} likes</span> : <span className="comment-like">{likeNumber} like</span> }
                        { (dislikesCommentId.includes(commentId) && dislikesUserId.includes(userId)) ? 
                            <FontAwesomeIcon icon={ faThumbsDown } className={"thumbs-down comment active-red"} onClick={()=> {
                                toggleDislike();
                            }}/>
                        :
                            <FontAwesomeIcon icon={ faThumbsDown } className={"thumbs-down comment"}  onClick={()=> {
                                toggleDislike();
                            }}/>
                        }
                        { (dislikeNumber > 1) ? <span className="comment-dislike">{likeNumber} dislikes</span> : <span className="comment-dislike">{dislikeNumber} dislike</span> }
                    </div>
                </div>
            </div>
    );
    
};

export default CommentsHome;