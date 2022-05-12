import React, { useState } from 'react';
import Log from '../components/Log';
import logo from '../images/icon-left-font-monochrome-white.svg';

const Register = () => {

    const [changeColor, setChangeColor] = React.useState(true);
    console.log([changeColor, setChangeColor]);

    return (
        
        <div className="register-page">
            <div className={changeColor ? "colored-box-red" : "colored-box-purple"}>
            </div>
            <div className="log-container">
                <div className="img-container">
                    <img src={ logo } alt="Logo de Groupomania" className="groupomania-logo" />
                </div>
                <h1 className="groupomania-message">
                    Réseau social d'entreprise
                </h1>
                <Log color_block={[changeColor, setChangeColor]}/>
            </div>
        </div>
    );
    
};

export default Register;