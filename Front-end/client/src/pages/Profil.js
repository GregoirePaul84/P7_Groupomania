import React from 'react';
import NavBar from '../components/Profil/Nav-bar';
import Posts from '../components/Profil/Posts';
import UserDescription from '../components/Profil/User_description';
import { useSelector } from 'react-redux';


const Profil = () => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    return (
        
            <div className="profil-page">
                <div className="background-transparent">
                <div className="profil-container">
                    <NavBar user_info={objectUser}/>
                    <UserDescription user_info={objectUser}/>
                    <Posts user_info={objectUser}/>
                </div>
            </div>
        </div>
        
    );
};

export default Profil;