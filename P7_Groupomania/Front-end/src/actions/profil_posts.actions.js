import axios from "axios";

export const GET_PROFIL_POSTS = "GET_USER_POSTS";

export const getProfilPosts = (userId) => {
    
    return async (dispatch) => {
        try {
           
            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/post/all/${userId}`,
                withCredentials: true,
            });
            
            dispatch({
                type: GET_PROFIL_POSTS,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}