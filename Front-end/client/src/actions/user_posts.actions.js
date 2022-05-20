import axios from "axios";

export const GET_USER_POSTS = "GET_USER_POSTS";

export const getUserPosts = (userId) => {
    
    return async (dispatch) => {
        try {
            console.log(userId);
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/post/all/${userId}`,
                withCredentials: true,
            });
            dispatch({
                type: GET_USER_POSTS,
                payload: res.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}