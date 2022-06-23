import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLikes } from '../../actions/user.actions';
import { convertTime } from '../../App';

const LeftSection = ({user_info}) => {

    const userId = user_info.user_id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLikes(userId));
    }, [userId, dispatch]);

    const dataResults = useSelector((state) => state.userAllReducer);

    let likesObject = {};

    if (Object.keys(dataResults).length !== 0) {
        likesObject = dataResults.likes.results;
        console.log(likesObject);
    }
    else {
        return;
    }

    return (
        <section className="left-container">
                            <div className="user-identity">
                                <div className="user-picture">
                                    <img src={user_info.profil_pic} alt="" />
                                </div>
                                <div className="user-name-container">
                                    <h4>{user_info.first_name}, {user_info.last_name}</h4>
                                    <p>{user_info.email}</p>
                                </div>
                            </div>
                            <div className="likes-container">
                                <div className="likes-header">
                                    <FontAwesomeIcon icon={ faHeart } />
                                    <span>Vos derniers likes</span>
                                </div>
                                <div className="title-line">
                                    <div className="purple-line"></div>
                                </div>
                                <ul className="likes-list">
                                    {likesObject.map((key) => {
                                        if (Object.keys(likesObject).length !== 0) {
                                            
                                            likesObject = dataResults.likes.results;
                                        
                                            return (
                                                
                                                <li key={key.likes_id}>
                                                    <div className="liked-post-user">
                                                        <div className="user-picture">
                                                            <img src={user_info.profil_pic} alt="" />
                                                        </div>
                                                        <div className="username">
                                                            <h4>Nom, prénom</h4>
                                                        </div>
                                                    </div>
                                                    <div className="liked-post-text">
                                                        <div className="date-liked">
                                                            <FontAwesomeIcon icon={ faThumbsUp } />
                                                            <span>{convertTime(key.created)}</span>
                                                        </div>
                                                        <div className="text-post">
                                                            "{key.text_post}"
                                                        </div>
                                                    </div>     
                                                </li>
                                                
                                            )   
                                        }
                                        else {
                                            return (null)
                                        }
                                    })}
                                </ul>
                            </div>
                        </section>
    );
};

export default LeftSection;