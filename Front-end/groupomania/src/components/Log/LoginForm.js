import React, {useState} from 'react';
import Axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {

    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} value="email"/>
            
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} value="password"/>
            <br />
            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default Login;