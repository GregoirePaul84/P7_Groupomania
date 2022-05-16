import React, {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        // On empêche le rechargement par défaut de la page lors de la soumission du formulaire
        event.preventDefault();

        const emailError = document.querySelector('.email_error');
        const passwordError = document.querySelector('.password_error');

        axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/auth/login`,
          withCredentials: true,
          data: {
              email: email,
              password: password
          },
        })

        .then((res, error) => {
          
          // Si le champ email est vide
          if (res.data.empty_email) {
            emailError.innerHTML = `${res.data.empty_email}`;
            return;
          }

          // Si le champ password est vide
          if (res.data.empty_password) {
            passwordError.innerHTML = `${res.data.empty_password}`;
            return;
          }

          // Si l'email et le password correspondent
          else {
            console.log(res);
            alert('connecté !')
            // window.location = '/';
          }  
        })

        .catch((error) => {

          // Si mot de passe incorrect
          if (error.response.data.wrong_password) {
            passwordError.innerHTML = `${error.response.data.wrong_password}`;
          }
          else {
            console.log(error);
          }
          
        })
    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">
            <h2>Heureux de vous revoir !</h2>
            <br />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
            <div className="email_error">
              {/* Merci d'inquer votre email */}
            </div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
            <div className="password_error">
              {/* Merci d'indiquer votre mot de passe */}
            </div>
            <br />
            <input type="submit" value="Se connecter" className='submit-button-purple' />
        </form>
    );
};

export default LoginForm;