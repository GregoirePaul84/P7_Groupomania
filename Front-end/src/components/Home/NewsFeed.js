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

    // const allUsersData = useSelector((state) => state.userAllReducer);

    // const [greenActive, setGreenActive] = useState(true);
    // const [redActive, setRedActive] = useState(true);
    // const [visibility, setVisibility] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    // const [textUpdate, setTextUpdate] = useState(null);
    // const [showPicture, setShowPicture] = useState(false);

    let postsObject = {};

    if (Object.keys(allPostsData).length !== 0) {
        postsObject = allPostsData.results;
    }
    else {
        return;
    }

    return (
        <div className='news-feed'>
            {postsObject.map((key) => {
                if (Object.keys(postsObject).length !== 0) {     
                    
                    return (
                        <div className="card-container" key={key.post_id}>
                            <div className="card-smallContainer">
                                <div className="card-user-picture">
                                    <img alt="utilisateur" />
                                </div>
                                <div className="card-name-user">
                                    <h3>Nom, Prénom</h3>
                                    <p>Email</p>
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
                                        {/* {isUpdated && (
                                            <div className="update-post">
                                                <textarea
                                                    className="update-content"
                                                    defaultValue={""}
                                                    onChange={ (e) => setTextUpdate(e.target.value)}
                                                />
                                                <div className="update-button">
                                                    <button className='btn' onClick={""}>Modifier</button>
                                                </div>
                                            </div>
                                        )} */}
                                        {/* { (imgUrl) ?  */}
                                            {/* <div className='picture' onClick={ (e) => setShowPicture(!showPicture)}> */}
                                                {/* <img src={imgUrl} alt="post utilisateur" /> */}
                                            {/* </div> */}
                                            {/* : <div></div>} */}
                                    </div>
                                </div>
                                <div className="card-likes-posts">
                                <FontAwesomeIcon icon={ faMessage } />
                                {/* { (numberOfComments > 1) ? <span>{numberOfComments} commentaires</span> : <span>{numberOfComments} commentaire</span> } */}
                                {/* eslint-disable-next-line */}
                                <FontAwesomeIcon icon={ faThumbsUp } />
                                {/* { (numberOfLikes > 1) ? <span className="post-like">{numberOfLikes} likes</span> : <span className="post-like">{numberOfLikes} like</span> } */}
                                {/* eslint-disable-next-line */}
                                <FontAwesomeIcon icon={ faThumbsDown } />
                                {/* { (numberOfDislikes > 1) ? <span className="post-dislike">{numberOfDislikes} dislikes</span> : <span className="post-dislike">{numberOfDislikes} dislike</span> } */}
                                </div>
                            </div>
                        </div>
                    )   
                }
                else {
                    return (null)
                }
            })}
        </div>
    );
};

export default NewsFeed;