import { GET_PROFIL } from "../actions/profil.actions";

const initialState = {};

export default function profilReducer(state= initialState, action) {
    switch(action.type) {

        case GET_PROFIL:
            return action.payload;

        default:
            return state;
    }
}