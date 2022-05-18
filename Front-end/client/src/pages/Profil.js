import React from 'react';
import NavBar from '../components/Profil/Nav-bar';
import Posts from '../components/Profil/Posts';
import UserDescription from '../components/Profil/User_description';

const Profil = () => {
    return (
        
            <div className="profil-page">
                <div className="background-transparent">
                <div className="profil-container">
                    <NavBar />
                    <UserDescription />
                    <Posts />
                </div>
            </div>
        </div>
        
    );
};

export default Profil;