import { combineReducers } from "redux";
import userReducer from './user.reducer';
import userPostReducer from "./user_posts.reducer";
import postReducer from "./post.reducer";
import commentsReducer from "./post_comments.reducer";

// On combine tous les reducers et on les envoie vers le store
export default combineReducers({
    userReducer,
    userPostReducer,
    postReducer,
    commentsReducer,
})