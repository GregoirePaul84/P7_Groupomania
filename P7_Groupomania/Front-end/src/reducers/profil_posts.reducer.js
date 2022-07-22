import { GET_PROFIL_POSTS } from "../actions/profil_posts.actions";

const initialState = {};

export default function profilPostReducer (state = initialState, action) {
    switch (action.type) {
        case GET_PROFIL_POSTS:
            return action.payload;

        default:
            return state;
    }
}