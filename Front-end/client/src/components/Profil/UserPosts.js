import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../actions/user_posts.actions';

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

  console.log(postsArray);
  
  return (
      <div>
        <div className="user-posts-container">
          <ul>
            {postsArray.map((post) => {
                return <li key={post.post_id}>{post.text}</li> })
              }
          </ul>
        </div>
      </div>
  );
};

export default UserPosts;