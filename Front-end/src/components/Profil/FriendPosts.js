import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera} from '@fortawesome/free-solid-svg-icons'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons'

const FriendPosts = (props) => {

    const objectUser = props.user_info;
    console.log(objectUser);
    // const userId = objectUser.user_id;

    return (
        <section className='main-section-profil'>
            <div className="flex-container">
                <div className="user-name">
                    <h2>{objectUser.first_name}, {objectUser.last_name}</h2>
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
            <div className="user-posts-container">
                <div className="card-container">
                    <div className="card-smallContainer">
                        <div className="card-user-picture">
                            <img src={objectUser.profil_pic} alt="utilisateur" />
                        </div>
                        <div className="card-name-user">
                            <h3>{objectUser.first_name}, {objectUser.last_name}</h3>
                            <p>{objectUser.email}</p>
                        </div>
                        <div className="card-message">
                            <div className="post-content">
                                <div className='message'>
                                {objectUser.first_name} n'a encore rien écrit... 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
};

export default FriendPosts;