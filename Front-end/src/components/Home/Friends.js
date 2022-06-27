import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/user.actions';
import { NavLink } from 'react-router-dom';


const Friends = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const allUsersData = useSelector((state) => state.userAllReducer);

    console.log(allUsersData);
    let usersObject = {};

    if (Object.keys(allUsersData).length !== 0) {
        usersObject = allUsersData.results;
        console.log(usersObject);
    }
    else {
        return;
    }


    return (
        <ul className="friends">
             {usersObject.map((key) => {
                if (Object.keys(usersObject).length !== 0) {     
                    
                    return (
                        <>
                        <li key={key.user_id}>
                            <div className="user-description-container">
                                <div className="user-picture">
                                    <NavLink to={`/profil/${key.user_id}`}>
                                        <img src={key.profil_pic} alt={`${key.first_name}`}/>
                                    </NavLink>
                                </div>
                                <div className="user-name">
                                    <h4>{key.first_name}, {key.last_name}</h4>
                                    <p>{key.email}</p>
                                </div>
                            </div>
                        </li>
                        <div className="friends-line">
                            <div className="purple-line"></div>
                        </div>
                        </>
                    )   
                }
                else {
                    return (null)
                }
            })}   
        </ul>
    );
};

export default Friends;