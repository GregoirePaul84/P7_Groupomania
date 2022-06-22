import { GET_ALL_LIKES, GET_ALL_USERS } from "../actions/user.actions";

const initialState = {};

export default function userAllReducer(state= initialState, action) {
    switch(action.type) {

        case GET_ALL_USERS:
            return action.payload;

        case GET_ALL_LIKES:
            return {
                ...state,
                likes: action.payload,
            };
            
        default:
            return state;
    }
}