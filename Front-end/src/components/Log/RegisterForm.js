import React, {useState} from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

const RegisterForm = () => {
  
  const [formSubmit, setFormSubmit] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ctrlPassword, setCtrlPassword] = useState('');

  const handleRegister = (event) => {
    // On empêche le rechargement par défaut de la page lors de la soumission du formulaire
    event.preventDefault();

    const lastNameError = document.querySelector('.last_name_error');
    const firstNameError = document.querySelector('.first_name_error');
    const emailError = document.querySelector('.email_error');
    const passwordError = document.querySelector('.password_error');
    const ctrlPasswordError = document.querySelector('.password_confirm_error');

    lastNameError.innerHTML = '';
    firstNameError.innerHTML = '';
    emailError.innerHTML = '';
    passwordError.innerHTML = '';
    ctrlPasswordError.innerHTML = '';

    // Vérification que les 2 passwords soient identiques
    if (password !== ctrlPassword) {
      ctrlPasswordError.innerHTML = 'Les mots de passe ne correspondent pas';
    }

    else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/register`,
        withCredentials: true,
        data: {  
          last_name: lastName,
          first_name: firstName,
          email: email,
          password: password
        }
      })

      .then((res) => {
        // Si tout est correct, on soumet le formulaire et on fait apparaître le component Login
        setFormSubmit(true);
        console.log('===>compte créé !');
      })

      .catch((error) => {
        // Si mot de passe trop faible
        if (error.response.data.weak_password) {
          passwordError.innerHTML = `${error.response.data.weak_password}`;
        }
        // Si le nom ne correspond pas à la Regex
        if (error.response.data.wrong_last_name) {
          lastNameError.innerHTML = `${error.response.data.wrong_last_name}`
        }
        // Si le prénom ne correspond pas à la Regex
        if (error.response.data.wrong_first_name) {
          firstNameError.innerHTML = `${error.response.data.wrong_first_name}`;
        }
        // Si l'email ne correspond pas à la Regex
        if (error.response.data.wrong_email) {
          emailError.innerHTML = `${error.response.data.wrong_email}`
        }
        // Si l'utilisateur est déjà présent dans la DB
        if (error.response.status === 409) {
          emailError.innerHTML = `Utilisateur déjà existant !`
        }
        else {
          console.log(error);
        }
      })
    }
  }
  
  return (
  <>
    {formSubmit ? (
      <>
        <h3 className='success'>Inscription réussie ! Vous pouvez vous connecter</h3>
        <LoginForm />
      </>
    ) : (
    <form action="" onSubmit={handleRegister} id="register-form">
      <div>
        <label htmlFor="lastName">Nom</label>
        <input type="text" name="lastName" id="lastName" onChange={(event) => setLastName(event.target.value)}/>
      </div>
      <div className="last_name_error">
        
      </div>
      <div>
        <label htmlFor="firstName">Prénom</label>
        <input type="text" name="firstName" id="firstName" onChange={(event) => setFirstName(event.target.value)}/>
      </div>
      <div className="first_name_error">
        
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" autoComplete='on' onChange={(event) => setEmail(event.target.value)}/>
      </div>
      <div className="email_error">
        
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" autoComplete='new-password' onChange={(event) => setPassword(event.target.value)}/>
      </div>
      <div className="password_error">
       
      </div>
      <div>
        <label htmlFor="password-confirm">Confirmer le mot de passe</label>
        <input type="password" name="password-confirm" id="password-confirm" autoComplete='new-password' onChange={(event) => setCtrlPassword(event.target.value)}/>
      </div>
      <div className="password_confirm_error">

      </div>
      <input type="submit" value="S'enregistrer" className='submit-button-red'/>
    </form>
    )}
  </>
  );
};

export default RegisterForm;