import { GET_ALL_USERS } from "../actions/user.actions";

const initialState = {};

export default function userAllReducer(state= initialState, action) {
    switch(action.type) {

        case GET_ALL_USERS:
            return action.payload;
            
        default:
            return state;
    }
}