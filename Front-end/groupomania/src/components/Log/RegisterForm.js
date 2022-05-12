import React, {useState} from 'react';
import Axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event) => {

  }

    return (
        
      <form action="" onSubmit={handleRegister} id="login-form">
        <label htmlFor="lastName">Nom</label>
        <input type="text" name="lastName" id="lastName" onChange={(event) => setLastName(event.target.value)}/>
        
        <label htmlFor="firstName">Prénom</label>
        <input type="text" name="firstName" id="firstName" onChange={(event) => setFirstName(event.target.value)}/>
        
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)}/>
        
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)}/>
        
        <label htmlFor="password-confirm">Confirmer le mot de passe</label>
        <input type="password" name="password-confirm" id="password-confirm" onChange={(event) => setPassword(event.target.value)}/>
        <br />
        <input type="submit" value="S'enregistrer" />
        
    </form>
    );
};

export default Register;