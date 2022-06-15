import { CANCEL_DISLIKE_POST, CANCEL_LIKE_POST, DELETE_POST, DISLIKE_POST, LIKE_POST, SEND_POST, UPDATE_POST} from "../actions/post.actions";

const initialState = {};

export default function postReducer(state= initialState, action) {
    switch(action.type) {
            
        case SEND_POST:
            return {
                ...state,
                post: action.payload,
            }

        case DELETE_POST:
            return {
                ...state,
                post: action.payload,
            }

        case UPDATE_POST:
            return {
                ...state,
                post: action.payload,
            }
            
        case LIKE_POST: 
            return {
                ...state,
                post: action.payload,
            }

        case CANCEL_LIKE_POST:
            return {
                ...state,
                post: action.payload,
            }
            
        case DISLIKE_POST: 
            return {
                ...state,
                post: action.payload,
            }

        case CANCEL_DISLIKE_POST: 
            return {
                ...state,
                post: action.payload,
            }

        default:
            return state;
    }
}