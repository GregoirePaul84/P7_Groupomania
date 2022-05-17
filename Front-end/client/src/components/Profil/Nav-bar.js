import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/icon-left-font-monochrome-white.svg';
import picLogout from '../../images/Photos de profil groupomania/zeus_arte.PNG';

const NavBar = () => {
    return (
        <header>
            <div className="groupomania-logo">
                <img src={logo} alt="logo de groupomania" />
            </div>
            <nav className="profil-nav-bar">
                <div className="home-settings-links">
                    <div className="home">
                        <NavLink to="/">
                            Accueil
                        </NavLink>
                    </div>
                    <div className="settings">
                        <NavLink to="/settings">
                            Paramètres
                        </NavLink>    
                    </div>
                    <div className="picture-logout">
                        <NavLink to="/">
                            <img src={picLogout} alt="" />
                        </NavLink> 
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;