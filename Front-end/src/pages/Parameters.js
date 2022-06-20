import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/Profil/NavBar';
import UserDescription from '../components/Profil/UserDescription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCamera } from '@fortawesome/free-solid-svg-icons';



const Settings = () => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    return (
        
        <div className="settings-page">
            <div className="background-transparent">
                <div className="settings-container">
                    <NavBar user_info={objectUser} />
                    <UserDescription user_info={objectUser} />
                    <section className="main-section-settings">
                        <div className="flex-container">
                            <div className="user-name">
                                <h2>{objectUser.first_name}, {objectUser.last_name}</h2>
                            </div>
                            <ul className="pictures-contact-box">
                                <li><FontAwesomeIcon icon={ faCamera } />Photos</li>
                                <li><FontAwesomeIcon icon={ faAddressBook } />Contacts</li>
                            </ul>
                        </div>
                        <div className="settings">
                            <div className="settings-title-box">
                                <h3 className="user-titles">Paramètres</h3>
                                <div className="purple-line"></div>
                            </div>
                        </div>
                        <form action="" className='settings-form'>
                            <h4>Changer votre photo de profil</h4>
                            <input type="file" />
                            <h4>Modifiez votre biographie</h4>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                            <h4>Nom</h4>
                            <input type="text" />
                            <h4>Prénom</h4>
                            <input type="text" />
                            <h4>Date de naissance</h4>
                            <input type="date" />
                            <h4>Adresse</h4>
                            <input type="text" />
                            <h4>Modifiez votre mot de passe</h4>
                            <input type="text" />
                        </form>
                    </section>
                </div>
            </div>
        </div>
        
    );
};

export default Settings;