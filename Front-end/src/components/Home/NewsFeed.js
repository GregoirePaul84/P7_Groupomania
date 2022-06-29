import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../actions/post.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faThumbsUp, faMessage, faThumbsDown, faTrashCan, faPen} from '@fortawesome/free-solid-svg-icons';
import { convertTime } from '../../App';
import { getAllUsers } from '../../actions/user.actions';

const NewsFeed = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllUsers());
    }, [dispatch]);

    const allPostsData = useSelector((state) => state.allPostsReducer);
    const allUsersData = useSelector((state) => state.userAllReducer);
    const allUsersResults = allUsersData.results;

    // const [greenActive, setGreenActive] = useState(true);
    // const [redActive, setRedActive] = useState(true);
    // const [visibility, setVisibility] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    // const [textUpdate, setTextUpdate] = useState(null);
    // const [showPicture, setShowPicture] = useState(false);

    let postsObject = [];

    if (Object.keys(allPostsData).length !== 0) {
        postsObject = allPostsData.results;
        console.log(postsObject);

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
    }
    else {
        return;
    }

    return (
        <div className='news-feed'>
            { (postsObject.length !== 0) ?
                postsObject.map((key) => {
                    return (
                        <div className={`card-container post_id${key.post_id}`} key={key.post_id}> 
                            <div className="card-smallContainer">
                                <div className="card-user-picture">
                                    <img alt="utilisateur" src={""} className="profil-pic"/>
                                </div>
                                <div className="card-name-user">
                                    <h3 className='user-name'></h3>
                                    <p className='email'></p>
                                </div>
                                <div className="modify-delete">
                                    <FontAwesomeIcon icon={faPen} />
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                                <div className="card-message">
                                    <FontAwesomeIcon icon={ faPaperPlane } />
                                    <span className="post-date">{convertTime(key.created)}</span>
                                    <div className="post-content">
                                        {isUpdated === false && <div className='message'>{key.text}</div>}
                                    </div>
                                </div>
                                <div className="card-likes-posts">
                                    <FontAwesomeIcon icon={ faMessage } />
                                    <FontAwesomeIcon icon={ faThumbsUp } />
                                    <FontAwesomeIcon icon={ faThumbsDown } />
                                </div>
                            </div>
                        </div>
                    )
                })
                : <div className='no-post'>
                    <FontAwesomeIcon icon={ faMessage } />
                    Aucun utilisateur n'a encore posté...
                  </div> }    
        </div>
    );
};

export default NewsFeed;