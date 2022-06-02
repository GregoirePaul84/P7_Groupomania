import { DISLIKE_POST, DISPLAY_LIKES, LIKE_POST, SEND_POST} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state= initialState, action) {
    switch(action.type) {
            
        case SEND_POST:
            return {
                ...state,
                post: action.payload,
            }
            
        case LIKE_POST: 
            return {
                ...state,
                post: action.payload,
            }
            
        case DISLIKE_POST: 
            return {
                ...state,
                post: action.payload,
            }
        
        case DISPLAY_LIKES: 
            return {
                ...state,
                post: action.payload,
            }

        default:
            return state;
    }
}