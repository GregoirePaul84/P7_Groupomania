import React from 'react';
// import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faCamera} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'
import UserPosts from './UserPosts';
import { sendPost } from '../../actions/post.actions';
import { useDispatch } from 'react-redux';
import { getUserPosts } from '../../actions/user_posts.actions';

const Posts = (props) => {

    const objectUser = props.user_info;
    const userId = objectUser.user_id;
    
    const dispatch = useDispatch();

    function writePost() {
        const postContent = document.querySelector('.input-send-post').value;
        dispatch(sendPost(postContent, userId))
            .then(() => document.querySelector('.input-send-post').value = '')
            .then(() => dispatch(getUserPosts(userId)));
    }

    return (
        <section className='main-section-profil'>
            <div className="user-name">
                <h2>{objectUser.first_name}, {objectUser.last_name} </h2>
            </div>
            <div className="input-pictures-contact-box">
                <form className="input-box">
                    <input type="text" placeholder={`Quoi de neuf, ${objectUser.first_name} ?`} className="input-send-post" />
                    <FontAwesomeIcon icon={ faPaperPlane } onClick={writePost}/>
                </form>
                <ul className="pictures-contact-box">
                    <li><FontAwesomeIcon icon={ faCamera } />Photos</li>
                    <li><FontAwesomeIcon icon={ faAddressBook } />Contacts</li>
                </ul>
            </div>
            <div className="posts">
                <div className="posts-title-box">
                    <h3 className="user-titles">Publications</h3>
                    <div className="purple-line"></div>
                </div>
                <UserPosts user_info={objectUser}/>
            </div>
        </section>
    );
};

export default Posts;