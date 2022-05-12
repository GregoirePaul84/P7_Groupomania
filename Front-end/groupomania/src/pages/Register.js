import React from 'react';
import Log from '../components/Log';
import logo from '../images/icon-left-font-monochrome-white.svg';

const Register = () => {
    return (
        
        <div className="register-page">
            <div className="colored-box-purple">
            </div>
            <div className="log-container">
                <div className="img-container">
                    <img src={ logo } alt="Logo de Groupomania" className="groupomania-logo" />
                </div>
                <Log />
            </div>
        </div>
    );
    
};

export default Register;