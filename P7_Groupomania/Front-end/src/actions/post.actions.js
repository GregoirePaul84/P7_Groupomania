import axios from "axios";

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const SEND_POST = "SEND_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const DELETE_PICTURE_POST = "DELETE_PICTURE_POST";
export const DELETE_LIKE_POST = "DELETE_LIKE_POST";
export const DELETE_DISLIKE_POST = "DELETE_DISLIKE_POST";
export const LIKE_POST = "LIKE_POST";
export const CANCEL_LIKE_POST = "CANCEL_LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";
export const CANCEL_DISLIKE_POST = "CANCEL_DISLIKE_POST";
export const GET_PICTURES_POST = "GET_PICTURES_POST";


export const getAllPosts = () => {
    
    return async (dispatch) => {
        try {
           
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/post`,
                withCredentials: true,
            });
            
            dispatch({
                type: GET_ALL_POSTS,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const sendPost = (data) => {

    return async (dispatch) => {

        try {
        
            // Envoie des données au backend
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post`,
                withCredentials: true,
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            dispatch({
                type: SEND_POST,
                payload: res.data.post
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const updatePost = (postId, textUpdate) => {
    return async (dispatch) => {

        try {
            // Transformation de la valeur de l'input en format JSON
            const data = JSON.stringify({
                "text": `${textUpdate}`
            });

            // Envoie des données au backend
            const res = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: UPDATE_POST,
                payload: res.data.post
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deletePost = (postId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_POST,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const deletePicturePost = (postId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/post/image/${postId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_PICTURE_POST,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteLikePost = (postId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/post/like/${postId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_LIKE_POST,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteDislikePost = (postId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/post/dislike/${postId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_DISLIKE_POST,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const likePost = (postId, postText) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "like": "1",
                "postText": `${postText}`
              });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });
            
            dispatch({
                type: LIKE_POST,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const cancelLikePost = (postId) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "like": "0"
            });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post/cancel/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: CANCEL_LIKE_POST,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const dislikePost = (postId) => {
    
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "dislike": "1"
              });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });
            
            dispatch({
                type: DISLIKE_POST,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const cancelDislikePost = (postId) => {
    console.log(postId);
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "dislike": "0"
            });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post/cancel/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: CANCEL_DISLIKE_POST,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const getPicturesPost = () => {
    
    return async (dispatch) => {
        try {
           
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/post/pictures/all/`,
                withCredentials: true,
            });
            
            dispatch({
                type: GET_PICTURES_POST,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

