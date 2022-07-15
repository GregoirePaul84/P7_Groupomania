import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { userLogout } from '../../actions/user.actions';
let hideButton = undefined;

const NavBarHome = (props) => {

    const [displayBox, setDisplayBox] = useState(true);

    function logoutPop() {
        document.querySelector('.logout-action').style.visibility = "visible";
        hideButton = setTimeout(function () {
            document.querySelector('.logout-action').style.visibility = "hidden";
          }, 5000);   
    }

    function closeSession() {
        clearTimeout(hideButton);
        userLogout();
    }
    
    function displayContacts() {

        setDisplayBox(!displayBox);
        console.log(displayBox);
        const selectContacts = document.querySelector('.right-container');

        if (displayBox)
            selectContacts.style.display = 'block';
        else
            selectContacts.style.display = 'none';
    }

    const objectUser = props.user_info;

    return (
        <header className='home-header'>
            <div className="img-container">
                <img src={ logo } alt="Logo de Groupomania" className="groupomania-logo" />
                <h1 className="bounce-in-right">Groupomania</h1>
            </div>
            <nav className="profil-nav-bar">
                <div className="home-settings-links">
                    <div className="profil">
                        <NavLink to={`/profil/${objectUser.user_id}`}>
                            Profil
                        </NavLink>
                    </div>
                    <div className="settings">
                        <NavLink to={`/settings/${objectUser.user_id}`}>
                            Paramètres
                        </NavLink>    
                    </div>
                    <div className="contacts">
                        <FontAwesomeIcon icon={ faBars } onClick={displayContacts}/>
                    </div>
                    <div className="picture-logout" onClick={logoutPop}>
                        <img src={objectUser.profil_pic} alt="déconnexion utilisateur" />
                        <FontAwesomeIcon icon={ faRightFromBracket } />
                    </div>
                    <NavLink to="/logout">
                        <button className="logout-action" onClick={closeSession}>
                            <FontAwesomeIcon icon={ faRightFromBracket } />
                            Se déconnecter
                        </button>
                    </NavLink> 
                </div>
            </nav>
        </header>
    );
};

export default NavBarHome;