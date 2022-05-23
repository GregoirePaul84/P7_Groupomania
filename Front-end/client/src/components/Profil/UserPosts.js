import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../actions/user_posts.actions';
import Card from './Card';

const UserPosts = (props) => {

  const userId = props.user_info.user_id;
  
  const [loadPostsUser, setLoadPostUser] = useState(true);
  const dispatch = useDispatch();

  let posts = {};
  posts = useSelector((state) => state.userPostReducer);
  const postsArray = posts.results;

  if (loadPostsUser && userId !== undefined) {
    dispatch(getUserPosts(userId));
    setLoadPostUser(false);
  }

  if (postsArray === undefined) {
    return;
  }

  return (
      
    <div className="user-posts-container">
      {postsArray.map((post) => {
        return <Card post={post} key={post.post_id} /> })
      }
    </div>
      
  );
};

export default UserPosts;