import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from '../../actions/user_posts.actions';
import Card from './Card';

const UserPosts = (props) => {

  const userInfo = props.user_info;
  const userId = userInfo.user_id;
  
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

  if (postsArray.length === 0) {
    return (
      <div className="user-posts-container">
        <div className="card-container">
          <div className="card-smallContainer">
            <div className="card-user-picture">
              <img src={userInfo.profil_pic} alt="utilisateur" />
            </div>
            <div className="card-name-user">
              <h3>{userInfo.first_name}, {userInfo.last_name}</h3>
              <p>{userInfo.email}</p>
            </div>
            <div className="card-message">
              <div className="post-content">
                <div className='message'>
                  Vous n'avez encore rien écrit... 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  else {
    return (
        
      <div className="user-posts-container">
        {postsArray.map((post) => {
          return <Card post={post} key={post.post_id} /> })
        }
      </div>
        
    )
  }

  
}

export default UserPosts;