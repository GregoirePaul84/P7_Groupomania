import React, {useState} from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event) => {
    // On empêche le rechargement par défaut de la page lors de la soumission du formulaire
    event.preventDefault();
  }

    return (
        
      <form action="" onSubmit={handleRegister} id="login-form">
        <div>
          <label htmlFor="lastName">Nom</label>
          <input type="text" name="lastName" id="lastName" onChange={(event) => setLastName(event.target.value)}/>
        </div>
        
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" name="firstName" id="firstName" onChange={(event) => setFirstName(event.target.value)}/>
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className="email error">

        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
        </div>
        
        <div>
          <label htmlFor="password-confirm">Confirmer le mot de passe</label>
          <input type="password" name="password-confirm" id="password-confirm" onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div className="password error">

        </div>
        <input type="submit" value="S'enregistrer" className='submit-button-red'/>
        
    </form>
    );
};

export default RegisterForm;