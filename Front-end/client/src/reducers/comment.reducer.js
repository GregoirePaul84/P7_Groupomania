import { GET_COMMENTS, SEND_COMMENT, UPDATE_COMMENT, LIKE_COMMENT, CANCEL_LIKE_COMMENT, DELETE_COMMENT, UPDATE_NB_COMMENT} from "../actions/comment.actions";

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
            return state.filter((comment) => comment.comment_id !== action.payload.commentId);

        case UPDATE_NB_COMMENT:
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