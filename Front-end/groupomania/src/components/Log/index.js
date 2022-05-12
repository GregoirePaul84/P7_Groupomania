import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const Log = () => {
    const [registerModal, setRegisterModal] = useState(true);
    const [loginModal, setLoginModal] = useState(false);

    const handleModals = (event) => {
        if (event.target.id === "register"){
            setLoginModal(false);
            setRegisterModal(true);
            
        }
        else if (event.target.id === "login") {
            setLoginModal(true);
            setRegisterModal(false);
            
        }

    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li onClick={handleModals} id="register">Créer un compte</li>
                    <li onClick={handleModals} id="login">Se connecter</li>
                </ul>
                {registerModal && <RegisterForm />}
                {loginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;