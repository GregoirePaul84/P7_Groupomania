import React, {useState} from 'react';
import Axios from 'axios';



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {

    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">
            <h2>Heureux de vous revoir !</h2>
            <br />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
            <br />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
            <br />
            <input type="submit" value="Se connecter" className='submit-button-purple' />
        </form>
    );
};

export default LoginForm;