import { GET_ALL_DISLIKES } from "../actions/user.actions";

const initialState = {};

export default function allDislikesReducer(state= initialState, action) {
    switch(action.type) {

        case GET_ALL_DISLIKES:
            return action.payload;
            
        default:
            return state;
    }
}