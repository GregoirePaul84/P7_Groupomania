import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { getAllLikes } from '../../actions/user.actions';

const LeftSection = ({user_info}) => {
    const userId = user_info.user_id;
    console.log(userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLikes(userId));
    }, [userId, dispatch]);

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

                                </ul>
                            </div>
                        </section>
    );
};

export default LeftSection;