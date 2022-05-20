import axios from "axios";

export const GET_USER = "GET_USER";

export const getUser = (userId) => {

    // Envoi au reducer pour stocker dans le store de Redux
    return(dispatch) => {

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