import React from 'react';
import NavBar from '../components/Profil/NavBar';
import InputArea from '../components/Profil/InputArea';
import UserDescription from '../components/Profil/UserDescription';
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
                    <InputArea user_info={objectUser}/>
                </div>
            </div>
        </div>
        
    );
};

export default Profil;