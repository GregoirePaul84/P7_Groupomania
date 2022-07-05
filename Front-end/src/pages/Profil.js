import React, { useEffect } from 'react';
import NavBar from '../components/Profil/NavBar';
import InputPost from '../components/Profil/InputPost';
import UserDescription from '../components/Profil/UserDescription';
import { useDispatch, useSelector } from 'react-redux';
import { getProfil } from '../actions/profil.actions';
import FriendPosts from '../components/Profil/FriendPosts';
import { getAllPosts } from '../actions/post.actions';
import { getUser } from '../actions/user.actions';
import { getUserPosts } from '../actions/user_posts.actions';
import { useParams } from 'react-router-dom';
let objectUser = {};
let objectProfil = {};
let userId = {};

const Profil = () => {

    const dispatch = useDispatch();

    const {user_id} = useParams();
    const paramsId = parseInt(user_id, 10);

    const userData = useSelector((state) => state.userReducer);
    const profilData = useSelector((state) => state.profilReducer);

    if (Object.keys(userData).length !== 0 && Object.keys(profilData).length !== 0) {
        objectUser = userData.results[0];
        userId = objectUser.user_id;

        objectProfil = profilData.results[0];
        console.log(objectProfil);
    }
    
    useEffect(() => {
        
        if(paramsId === userId) {
            console.log(paramsId);
            console.log(userId);
            dispatch(getUser(userId));
            dispatch(getUserPosts(userId));
        }
        else {
            console.log(paramsId);
            console.log(userId);
            dispatch(getProfil(paramsId));
            dispatch(getAllPosts());
        }
        // eslint-disable-next-line
    }, [ userId, paramsId])

    if(paramsId === userId) {
        return (
            <div className="profil-page">
                <div className="background-transparent">
                    <div className="profil-container">
                        <NavBar user_info={objectUser} userId={userId}/>
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
                        <NavBar user_info={objectProfil} userId={userId}/>
                        <UserDescription user_info={objectProfil}/>
                        <FriendPosts user_info={objectProfil}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Profil;