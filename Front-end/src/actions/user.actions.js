import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_USER = "GET_USER";
export const GET_USER_POSTS = "GET_USER_POSTS";
export const UPLOAD_PROFIL = "UPLOAD_PROFIL";
export const DELETE_USER = "DELETE_USER";
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

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


export const getUser = (userId) => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {

            // Contrôle que l'userId est bien un nombre, sinon on bloque la fonction
            if (isNaN(userId)) {
                return;
            }
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
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
            
            const res = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/user/password/${userId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
                
            });

            dispatch({
                type: CHANGE_PASSWORD,
                payload: res.data.password
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}
