import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";

export const getComments = (postId) => {
    
    return async (dispatch) => {
        try {
            console.log(postId);
           
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/comment/${postId}`,
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
