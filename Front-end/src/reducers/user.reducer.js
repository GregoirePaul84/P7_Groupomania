import { GET_USER, UPLOAD_PROFIL } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state= initialState, action) {
    switch(action.type) {

        case GET_USER:
            return action.payload;

        case UPLOAD_PROFIL:
            return {
                ...state,
                profil: action.payload,
            };

        default:
            return state;
    }
}