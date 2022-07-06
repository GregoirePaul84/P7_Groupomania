import { combineReducers } from "redux";
import userReducer from './user.reducer';
import userAllReducer from "./user_all.reducer";
import userPostReducer from "./user_posts.reducer";
import postReducer from "./post.reducer";
import commentsReducer from "./comment.reducer";
import allPostsReducer from "./all_posts.reducer";
import allLikesReducer from "./all_likes.reducer";
import allDislikesReducer from "./all_dislikes.reducer";
import profilReducer from "./profil.reducer";

// On combine tous les reducers et on les envoie vers le store
export default combineReducers({
    userReducer,
    userAllReducer,
    userPostReducer,
    postReducer,
    commentsReducer,
    allPostsReducer,
    allLikesReducer,
    allDislikesReducer,
    profilReducer,
})