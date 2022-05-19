import React from 'react';
// import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faCamera} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'

const Posts = () => {
    return (
        <section className='main-section-profil'>
            <div className="input-pictures-contact-box">
                <div className="input-box">
                    <input type="text" placeholder='Quoi de neuf, Zeus?' />
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
        </section>
    );
};

export default Posts;