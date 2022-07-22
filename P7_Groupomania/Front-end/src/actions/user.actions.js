import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER = "GET_USER";
export const GET_USER_POSTS = "GET_USER_POSTS";
export const UPLOAD_PROFIL = "UPLOAD_PROFIL";
export const DELETE_USER = "DELETE_USER";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const GET_ALL_LIKES = "GET_ALL_LIKES";
export const GET_ALL_DISLIKES = "GET_ALL_DISLIKES";
export const USER_LOGOUT = "USER_LOGOUT";

export const getAllUsers = () => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {

            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user`,
                withCredentials: true,
            });

            dispatch({
                type: GET_ALL_USERS,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const getUser = () => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/one`,
                withCredentials: true,
            });

            dispatch({
                type: GET_USER,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const uploadProfil = (data, userId) => {
    
    return async (dispatch) => {
        try {
            
            const res = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
                
            });

            dispatch({
                type: UPLOAD_PROFIL,
                payload: res.data.profil
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteUser = (userId) => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {

            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_USER,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const changePassword = (password, userId) => {
    
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "password": password
            });
            
            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/user/password/${userId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
                
            });

            alert("mot de passe modifié !");

        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllLikes = (userId) => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {
            
            if (isNaN(userId)) {
                return;
            }

            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/likes/${userId}`,
                withCredentials: true,
            });

            dispatch({
                type: GET_ALL_LIKES,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllDislikes = (userId) => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {
            
            if (isNaN(userId)) {
                return;
            }

            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/dislikes/${userId}`,
                withCredentials: true,
            });

            dispatch({
                type: GET_ALL_DISLIKES,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const userLogout = async () => {

    try {
        console.log('déconnexion');

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
            withCredentials: true,
        });
        
    } catch (error) {
        console.log(error);
    }
}