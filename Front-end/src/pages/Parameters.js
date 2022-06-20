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

    console.log(objectUser);

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
                        <form action="" method='post' className='settings-form'>
                            <label htmlFor="profilPic">Changez votre photo de profil :</label>
                            <input type="file" id='profilPic'/>
                            <label htmlFor="biography">Biographie :</label>
                            <textarea name="" id="biography" cols="30" rows="10" defaultValue={objectUser.bio}></textarea>
                            <div className="input-container">
                                <div className="info-container">
                                    <label htmlFor="lastName">Nom :</label>
                                    <input type="text" id='lastName' defaultValue={objectUser.last_name}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="firstName">Prénom :</label>
                                    <input type="text" id='firstName' defaultValue={objectUser.first_name}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="birthday">Date de naissance :</label>
                                    <input type="date" id='birthday' defaultValue={objectUser.date_naissance}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="address">Adresse :</label>
                                    <input type="text" id='address' defaultValue={objectUser.adresse}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="password">Changez votre mot de passe :</label>
                                    <input type="text" id='password'/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="confirmPassword">Confirmez votre mot de passe :</label>
                                    <input type="text" id='confirmPassword'/>
                                </div>
                            </div>
                            <input type="submit" value="Modifiez votre profil" id='submit-form'/>
                        </form>
                    </section>
                </div>
            </div>
        </div>
        
    );
};

export default Settings;