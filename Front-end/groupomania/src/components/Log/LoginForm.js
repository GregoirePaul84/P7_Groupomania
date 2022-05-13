import React, {useState} from 'react';
import axios from 'axios';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        // On empêche le rechargement par défaut de la page lors de la soumission du formulaire
        event.preventDefault();

        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/login`,
        withCredentials: true,
        data: {
            email: email,
            password: password
        }
        })
        .then((res) => {
            if (res.data.errors) {
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            }
            else {
              window.location = '/';
            }
          })
          .catch((error) => {
            console.log(error);
          })
    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">
            <h2>Heureux de vous revoir !</h2>
            <br />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
            <div className="email error">

            </div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
            <div className="email error">

            </div>
            <br />
            <input type="submit" value="Se connecter" className='submit-button-purple' />
        </form>
    );
};

export default LoginForm;