import { combineReducers } from "redux";
import userReducer from './user.reducer';
import userPostReducer from "./user_posts.reducer";

export default combineReducers({
    userReducer,
    userPostReducer,
})