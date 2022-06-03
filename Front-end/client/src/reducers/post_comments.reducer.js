import { GET_COMMENTS} from "../actions/post_comments.actions";

const initialState = {};


export default function commentsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;
            
        default:
            return state;
    }
}