import { GET_COMMENTS, SEND_COMMENT, UPDATE_COMMENT, LIKE_COMMENT, CANCEL_LIKE_COMMENT, DELETE_COMMENT, DECREASE_NB_COMMENTS, INCREASE_NB_COMMENTS} from "../actions/comment.actions";

const initialState = {};


export default function commentsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload;

        case SEND_COMMENT:
            return {
                ...state,
                comment: action.payload,
            }

        case UPDATE_COMMENT:
            return {
                ...state,
                comment: action.payload,
            }

        case DELETE_COMMENT:
            return {
                ...state,
                post: action.payload,
            }

        case INCREASE_NB_COMMENTS:
            return {
                ...state,
                comment: action.payload,
            }

        case DECREASE_NB_COMMENTS:
            return {
                ...state,
                comment: action.payload,
            }

        case LIKE_COMMENT: 
            return {
                ...state,
                post: action.payload,
            }

        case CANCEL_LIKE_COMMENT:
            return {
                ...state,
                post: action.payload,
            }
            
        // case DISLIKE_C: 
        //     return {
        //         ...state,
        //         post: action.payload,
        //     }
            
        default:
            return state;
    }
}