import React from 'react';
// import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faCamera} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'
import UserPosts from './UserPosts';

const Posts = (props) => {

    function handleClick() {
        console.log('✨ Ceci est un clic ✨')
    }

    const objectUser = props.user_info;

    return (
        <section className='main-section-profil'>
            <div className="user-name">
                <h2>{objectUser.first_name}, {objectUser.last_name} </h2>
            </div>
            <div className="input-pictures-contact-box">
                <div className="input-box">
                    <input type="text" placeholder={`Quoi de neuf, ${objectUser.first_name} ?`} onClick={handleClick}/>
                    <FontAwesomeIcon icon={ faPaperPlane } />
                </div>
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
            </div>
            <UserPosts user_info={objectUser}/>
        </section>
    );
};

export default Posts;