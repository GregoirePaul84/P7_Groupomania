import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USER_POSTS = "GET_USER_POSTS";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const SEND_POST = "SEND_POST";

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

export const uploadPicture = (data, userId) => {
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
                type: UPLOAD_PICTURE,
                payload: res.data.picture
            });

            const res2 = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
                withCredentials: true,
            });

            dispatch({
                type: GET_USER,
                payload: res2.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const sendPost = (postContent, userId) => {
    return async (dispatch) => {

        try {
            // Transformation de la valeur de l'input en format JSON
            const data = JSON.stringify({
                "text": `${postContent}`
              });

            // Envoie des données au backend
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: SEND_POST,
                payload: res.data.post
            });

            // Récupération de tous les posts de l'utilisateur pour actualiser le dernier post
            const res2 = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/post/all/${userId}`,
                withCredentials: true,
            });
            dispatch({
                type: GET_USER_POSTS,
                payload: res2.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
    
}