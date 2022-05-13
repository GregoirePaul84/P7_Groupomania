import React, { useState } from 'react';
import Log from '../components/Log';
import logo from '../images/Logo.png';

const Register = () => {

    const [changeColor, setChangeColor] = React.useState(true);
    console.log([changeColor, setChangeColor]);

    return (
        
        <div className="register-page">
            <div className={changeColor ? "colored-box-red" : "colored-box-purple"}>
            </div>
            <div className="log-container">
                <div className="img-container">
                    <h1 className="bounce-in-right">Groupomania</h1>
                    <img src={ logo } alt="Logo de Groupomania" className="groupomania-logo" />
                </div>
                <h2 className="groupomania-message">
                    Réseau social d'entreprise
                </h2>
                <Log color_block={[changeColor, setChangeColor]}/>
            </div>
        </div>
    );
    
};

export default Register;