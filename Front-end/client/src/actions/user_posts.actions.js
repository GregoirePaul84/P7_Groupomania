import axios from "axios";

export const GET_USER_POSTS = "GET_USER_POSTS";

export const getUserPosts = () => {
    return (dispatch) => {
        return axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
            withCredentials: true,     
        })
        .then((res) => {
            dispatch({type: GET_USER,
                    payload: res.data})
        })
        .catch((error) => {
            console.log(error)
        })
    }
}