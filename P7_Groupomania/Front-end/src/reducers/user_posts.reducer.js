import { GET_USER_POSTS } from "../actions/user_posts.actions";

const initialState = {};

export default function userPostReducer (state = initialState, action) {
    switch (action.type) {
        case GET_USER_POSTS:
            return action.payload;

        default:
            return state;
    }
}