import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";

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
