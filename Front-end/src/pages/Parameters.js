import React, { useEffect, useState } from 'react';
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/Profil/NavBar';
import UserDescription from '../components/Profil/UserDescription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { changePassword, deleteUser, getUser, uploadProfil } from '../actions/user.actions';



const Settings = () => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    // Récupération du cookie et décodage du token pour récupérer l'user Id 
    const readCookie = document.cookie;
    const token = readCookie.split('jwt=')[1];
    const { decodedToken } = useJwt(token);
    let userIdToken = {};

    if (decodedToken !== null) {
        userIdToken = decodedToken.userId
    }

    const userId = objectUser.user_id;
    const userBio = objectUser.bio;
    const userLastName = objectUser.last_name;
    const userFirstName = objectUser.first_name;
    const userBirthday = objectUser.date_naissance;
    const userAddress = objectUser.adresse;
    const userPhone = objectUser.tel;


    const [file, setFile] = useState();
    const [bio, setBio] = useState('');
    const [lastName, setLastname] = useState('');
    const [firstName, setFirstname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [ctrlPassword, setCtrlPassword] = useState('');

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
        data.append('tel', phoneNumber);
        console.log(password.length);
               
        if (password !== ctrlPassword) {
            console.log(password.length);
            alert('Les mots de passe ne correspondent pas');
        }
        else if (password.length !== 0) {
            
            dispatch(changePassword(password, userId))
                .then(() => dispatch(getUser(userId)));
        }

        dispatch(uploadProfil(data, userId))
            .then(() => dispatch(getUser(userId)));
        setFile(false);
    }

    function deleteAccount() {
        console.log("compte supprimé");
        dispatch(deleteUser(userId))
            .then(() => window.location = "/register");
    }

    useEffect(() => {
        setBio(userBio);
        setFirstname(userFirstName);
        setLastname(userLastName);
        setBirthday(userBirthday);
        setAddress(userAddress);
        setPhoneNumber(userPhone);

    }, [userBio, userFirstName, userLastName, userBirthday, userAddress, userPhone]);

    useEffect(() => {
        if (file) {
            const selectInput = document.getElementById('profil-pic');
            selectInput.style.color = '#8D76FF';
            selectInput.classList.add('change-color');
        }
        else if (file === false) {
            const selectInput = document.getElementById('profil-pic');
            selectInput.style.color = 'inherit';
            selectInput.classList.remove('change-color');
        }
        
    }, [file])

    return (
        
        <div className="settings-page">
            <div className="background-transparent">
                <div className="settings-container">
                    <NavBar user_info={objectUser} userId={userIdToken}/>
                    <UserDescription user_info={objectUser} />
                    <section className="main-section-settings">
                        <div className="flex-container">
                            <div className="user-name">
                            <div className="cellphone-profil-pic">
                                <img src={objectUser.profil_pic} alt="utilisateur mobile" />
                            </div>
                                <h2>{userFirstName}, {userLastName}</h2>
                            </div>
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
                                      defaultValue={null} 
                                      onChange={(e) => setBio(e.target.value)}></textarea>
                            <div className="input-container">
                                <div className="info-container">
                                    <label>Photo de profil :</label>
                                    <input type="file"
                                        id="profil-pic"
                                        name="profil_image"
                                        className='select_image'
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(e) => setFile(e.target.files[0])}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="lastName">Nom :</label>
                                    <input type="text" 
                                           id='lastName' 
                                           defaultValue={userLastName} 
                                           onChange={(e) => setLastname(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="firstName">Prénom :</label>
                                    <input type="text" 
                                           id='firstName' 
                                           defaultValue={userFirstName} 
                                           onChange={(e) => setFirstname(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="birthday">Date de naissance :</label>
                                    <input type="date" 
                                           id='birthday' 
                                           defaultValue={null} 
                                           onChange={(e) => setBirthday(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="address">Adresse :</label>
                                    <input type="text" 
                                           id='address' 
                                           defaultValue={null} 
                                           onChange={(e) => setAddress(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="tel">Téléphone :</label>
                                    <input type="text" 
                                           id='tel' 
                                           autoComplete='on'
                                           defaultValue={null} 
                                           onChange={(e) => setPhoneNumber(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="password">Changez votre mot de passe :</label>
                                    <input type="password" 
                                           id='password'
                                           autoComplete="current-password"
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="info-container">
                                    <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
                                    <input type="password" 
                                           id='confirmPassword'
                                           autoComplete="current-password"
                                           onChange={(event) => setCtrlPassword(event.target.value)}/>
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