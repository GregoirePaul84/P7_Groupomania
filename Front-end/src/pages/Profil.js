import React, { useEffect } from 'react';
import { useJwt } from "react-jwt";
import NavBar from '../components/Profil/NavBar';
import InputPost from '../components/Profil/InputPost';
import UserDescription from '../components/Profil/UserDescription';
import { useDispatch, useSelector } from 'react-redux';
import { getProfil } from '../actions/profil.actions';
import FriendPosts from '../components/Profil/FriendPosts';
import { getAllPosts } from '../actions/post.actions';

const Profil = () => {

    const dispatch = useDispatch();

    const url = window.location.href;
    const userId = parseInt(url.split('/')[4], 10);

    // Récupération du cookie et décodage du token pour récupérer l'user Id 
    const readCookie = document.cookie;
    const token = readCookie.split('jwt=')[1];
    const { decodedToken } = useJwt(token);
    let userIdToken = {};

    if (decodedToken !== null) {
        userIdToken = decodedToken.userId
    }

    useEffect(() => {
        dispatch(getProfil(userId))
        dispatch(getAllPosts());
    }, [dispatch, userId])

    const userData = useSelector((state) => state.profilReducer);

    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    if(userId === userIdToken) {
        return (
            <div className="profil-page">
                <div className="background-transparent">
                    <div className="profil-container">
                        <NavBar user_info={objectUser} userId={userIdToken}/>
                        <UserDescription user_info={objectUser}/>
                        <InputPost user_info={objectUser}/>
                    </div>
                </div>
            </div>      
        )  
    }
    else {
        return (
            <div className="profil-page">
                <div className="background-transparent">
                    <div className="profil-container">
                        <NavBar user_info={objectUser} userId={userIdToken}/>
                        <UserDescription user_info={objectUser}/>
                        <FriendPosts user_info={objectUser}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profil;