import axios from "axios";
import { GET_USER_POSTS } from "./user_posts.actions";

export const SEND_POST = "SEND_POST";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
export const CANCEL_LIKE_POST = "CANCEL_LIKE_POST";
export const DISLIKE_POST = "DISLIKE_POST";
export const CANCEL_DISLIKE_POST = "CANCEL_DISLIKE_POST";
export const DISPLAY_LIKES = "DISPLAY_LIKES"

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


export const likePost = (postId, userId) => {
    console.log(userId);
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "like": "1"
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

            // Récupération de tous les posts de l'utilisateur pour actualiser le like
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


export const cancelLikePost = (postId, userId) => {
    console.log(postId);
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

            // Récupération de tous les posts de l'utilisateur pour actualiser l'annulation du like'
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


export const dislikePost = (postId, userId) => {
    
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "like": "-1"
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

            // Récupération de tous les posts de l'utilisateur pour actualiser le like
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


export const cancelDislikePost = (postId, userId) => {
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

            // Récupération de tous les posts de l'utilisateur pour actualiser l'annulation du like'
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



export const displayLikes = (postId) => {
    
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "post_id": postId
              });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: DISPLAY_LIKES,
                payload: res.data.results
            });

        } catch (error) {
            console.log(error);
        }
    }
}