import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const SEND_COMMENT = "SEND_COMMENT";

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

export const sendComment = (commentContent, postId) => {
    return async (dispatch) => {

        try {
            // Transformation de la valeur de l'input en format JSON
            const data = JSON.stringify({
                "text": `${commentContent}`,
                "post_id": `${postId}`
            });

            // Envoie des données au backend
            const res = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/comment`,
                withCredentials: true,
                data: data,
                headers: { "Content-Type": "application/json" },
            });

            dispatch({
                type: SEND_COMMENT,
                payload: res.data.comment
            });

            // Récupération de tous les commentaires pour actualiser après envoi
            const res2 = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/comment`,
                withCredentials: true,
            });

            dispatch({
                type: GET_COMMENTS,
                payload: res2.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}
