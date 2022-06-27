import { GET_ALL_LIKES } from "../actions/user.actions";

const initialState = {};

export default function allLikesReducer(state= initialState, action) {
    switch(action.type) {

        case GET_ALL_LIKES:
            return action.payload;
            
        default:
            return state;
    }
}