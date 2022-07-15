import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { userLogout } from '../../actions/user.actions';
let hideButton = undefined;

const NavBar = () => {

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
    
    const userData = useSelector((state) => state.userReducer);
    if (Object.keys(userData).length === 0) return;
    const userDataResults = userData.results;
    const userId = userDataResults[0].user_id;

    
    return (
        <header>
            <div className="img-container">
                <img src={ logo } alt="Logo de Groupomania" className="groupomania-logo" />
                <h1 className="bounce-in-right">Groupomania</h1>
            </div>
            <nav className="profil-nav-bar">
                <div className="home-settings-links">
                    <div className="home">
                        <NavLink to="/home">
                            Accueil
                        </NavLink>
                    </div>
                    <div className="profil">
                        <NavLink to={`/profil/${userId}`}>
                            Profil
                        </NavLink>
                    </div>
                    <div className="settings">
                        <NavLink to={`/settings/${userId}`}>
                            Paramètres
                        </NavLink>    
                    </div>
                    <div className="picture-logout" onClick={logoutPop}>
                        <img src={userDataResults[0].profil_pic} alt="déconnexion utilisateur" />
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

export default NavBar;