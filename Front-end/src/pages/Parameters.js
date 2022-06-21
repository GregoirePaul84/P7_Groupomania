import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Profil/NavBar';
import UserDescription from '../components/Profil/UserDescription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faCamera, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { deleteUser, getUser, uploadProfil } from '../actions/user.actions';



const Settings = () => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    const userId = objectUser.user_id;
    const userBio = objectUser.bio;
    const userLastName = objectUser.last_name;
    const userFirstName = objectUser.first_name;
    const userBirthday = objectUser.date_naissance;
    const userAddress = objectUser.adresse;

    
    const [file, setFile] = useState();
    const [bio, setBio] = useState(userBio);
    const [lastName, setLastname] = useState(userLastName);
    const [firstName, setFirstname] = useState(userFirstName);
    const [birthday, setBirthday] = useState(userBirthday);
    const [address, setAddress] = useState(userAddress);
    const [password, setPassword] = useState();

    const dispatch = useDispatch();

    function handleInfos(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('profil_image', file);
        data.append('bio', bio);
        data.append('last_name', lastName);
        data.append('first_name', firstName);
        data.append('date_naissance', birthday);
        data.append('adresse', address);
        console.log(data.get('profil_image'));
        console.log(data.get('last_name'));

        dispatch(uploadProfil(data, userId))
            .then(() => dispatch(getUser(userId)));
        setFile(false);
    }

    function deleteAccount() {
        console.log("compte supprimé");
        dispatch(deleteUser(userId))
            .then(() => window.location = "/register");
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
                        <form action="" className='settings-form' onSubmit={handleInfos}>
                            <label htmlFor="biography">Biographie :</label>
                            <textarea name="bio" 
                                      id="biography" 
                                      cols="30" 
                                      rows="10" 
                                      defaultValue={objectUser.bio} 
                                      onChange={(e) => setBio(e.target.value)}></textarea>
                            <div className="input-container">
                                <div className="info-container">
                                    <label htmlFor="file">Photo de profil :</label>
                                    <input type="file"
                                        id="file"
                                        name="profil_image"
                                        className='select_image'
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(e) => setFile(e.target.files[0])}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="lastName">Nom :</label>
                                    <input type="text" 
                                           id='lastName' 
                                           defaultValue={objectUser.last_name} 
                                           onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="firstName">Prénom :</label>
                                    <input type="text" 
                                           id='firstName' 
                                           defaultValue={objectUser.first_name} 
                                           onChange={(e) => setFirstname(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="birthday">Date de naissance :</label>
                                    <input type="date" 
                                           id='birthday' 
                                           defaultValue={objectUser.date_naissance} 
                                           onChange={(e) => setBirthday(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="address">Adresse :</label>
                                    <input type="text" 
                                           id='address' 
                                           defaultValue={objectUser.adresse} 
                                           onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="tel">Téléphone :</label>
                                    <input type="text" 
                                           id='tel' 
                                           defaultValue={objectUser.tel} 
                                           onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="password">Changez votre mot de passe :</label>
                                    <input type="text" id='password'/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
                                    <input type="text" id='confirmPassword'/>
                                </div>
                            </div>
                            <div className="submit-container">
                                <input type="submit" value="Modifiez votre profil" id='submit-form' />
                            </div>
                            <div className="delete-account-container">
                                <span onClick={() => { if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?'))
                                                        { deleteAccount() }
                                                    }}>
                                    <FontAwesomeIcon icon={ faUserXmark } />
                                    Supprimer le compte
                                </span>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
        
    );
};

export default Settings;