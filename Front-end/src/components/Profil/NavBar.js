import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/icon-left-font-monochrome-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const NavBar = (props) => {

    function logoutPop() {
        document.querySelector('.logout-action').style.visibility = "visible";
        setTimeout(function () {
            document.querySelector('.logout-action').style.visibility = "hidden";
          }, 5000);   
    }
    
    const userIdToken = props.userId;

    const userData = useSelector((state) => state.userReducer);
    const userDataResults = userData.results;

    if (userDataResults === undefined) return;

    console.log(userDataResults.profil_pic);

    return (
        <header>
            <div className="groupomania-logo">
                <img src={logo} alt="logo de groupomania" />
            </div>
            <nav className="profil-nav-bar">
                <div className="home-settings-links">
                    <div className="home">
                        <NavLink to="/home">
                            Accueil
                        </NavLink>
                    </div>
                    <div className="profil">
                        <NavLink to={`/profil/${userIdToken}`}>
                            Profil
                        </NavLink>
                    </div>
                    <div className="settings">
                        <NavLink to="/settings">
                            Paramètres
                        </NavLink>    
                    </div>
                    <div className="picture-logout" onClick={logoutPop}>
                        <img src={userDataResults[0].profil_pic} alt="déconnexion utilisateur" />
                        <FontAwesomeIcon icon={ faRightFromBracket } />
                    </div>
                    <NavLink to="/logout">
                        <button className="logout-action">
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