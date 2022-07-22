import axios from "axios";

export const GET_PROFIL = "GET_PROFIL";

export const getProfil = (paramsId) => {

    // Envoi au reducer pour stocker dans le store de Redux
    return async (dispatch) => {

        try {

            const res = await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}api/user/${paramsId}`,
                withCredentials: true,
            });

            dispatch({
                type: GET_PROFIL,
                payload: res.data
            });
            
        } catch (error) {
            console.log(error);
        }
    }
}
