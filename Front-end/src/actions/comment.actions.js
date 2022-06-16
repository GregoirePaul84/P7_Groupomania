import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const SEND_COMMENT = "SEND_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_PICTURE_COMMENT = "DELETE_PICTURE_COMMENT";
export const DELETE_LIKE_COMMENT = "DELETE_LIKE_COMMENT";
export const DELETE_DISLIKE_COMMENT = "DELETE_DISLIKE_COMMENT";
export const INCREASE_NB_COMMENTS = "INCREASE_NB_COMMENTS";
export const DECREASE_NB_COMMENTS = "DECREASE_NB_COMMENTS";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const CANCEL_LIKE_COMMENT = "CANCEL_LIKE_COMMENT";
export const DISLIKE_COMMENT = "LIKE_COMMENT";
export const CANCEL_DISLIKE_COMMENT = "CANCEL_LIKE_COMMENT";

export const getComments = () => {
    
    return async (dispatch) => {
        try {
           
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/comment`,
                withCredentials: true,
            });

            dispatch({
                type: GET_COMMENTS,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const sendComment = (data) => {
    console.log(...data);
    
    return async (dispatch) => {
        try {

            // Envoie des données au backend
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comment`,
                withCredentials: true,
                data: data,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            dispatch({
                type: SEND_COMMENT,
                payload: res.data.comment
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const updateComment = (commentId, textUpdate) => {
    return async (dispatch) => {

        try {
            // Transformation de la valeur de l'input en format JSON
            const data = JSON.stringify({
                "text": `${textUpdate}`
              });

            // Envoie des données au backend
            const res = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: UPDATE_COMMENT,
                payload: res.data.comment
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteComment = (commentId, postId) => {
    return async (dispatch) => {

        try {

            const data = JSON.stringify({
                "postId": `${postId}`
              });

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
                withCredentials: true,
                data: data
            });

            dispatch({
                type: DELETE_COMMENT,
                payload: res.commentId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const deletePictureComment = (commentId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/comment/image/${commentId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_PICTURE_COMMENT,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteLikeComment = (commentId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/comment/like/${commentId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_LIKE_COMMENT,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const deleteDislikeComment = (commentId) => {
    return async (dispatch) => {

        try {

            // Envoie des données au backend
            const res = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_URL}api/comment/dislike/${commentId}`,
                withCredentials: true,
            });

            dispatch({
                type: DELETE_DISLIKE_COMMENT,
                payload: res.postId
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const increaseNbOfComments = (postId) => {
    return async (dispatch) => {

        try {

            const data = JSON.stringify({
                "postId": `${postId}`
              });

            const res = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/comment/increment/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: INCREASE_NB_COMMENTS,
                payload: res.data.comment
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const decreaseNbOfComments = (postId) => {
    return async (dispatch) => {

        try {

            const data = JSON.stringify({
                "postId": `${postId}`
              });

            const res = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/comment/decrement/${postId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: DECREASE_NB_COMMENTS,
                payload: res.data.comment
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}


export const likeComment = (commentId) => {
    console.log(commentId);
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "like": "1"
              });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });
            dispatch({
                type: LIKE_COMMENT,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const cancelLikeComment = (commentId) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "like": "0"
            });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comment/cancel/${commentId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: CANCEL_LIKE_COMMENT,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}

export const dislikeComment = (commentId) => {
    
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "dislike": "1"
              });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comment/${commentId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });
            
            dispatch({
                type: DISLIKE_COMMENT,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}


export const cancelDislikeComment = (commentId) => {
    
    return async (dispatch) => {
        try {
            const data = JSON.stringify({
                "dislike": "0"
            });
            
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comment/cancel/${commentId}`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: CANCEL_DISLIKE_COMMENT,
                payload: res.data
            });

        } catch (error) {
            console.log(error);
        }
    }
}