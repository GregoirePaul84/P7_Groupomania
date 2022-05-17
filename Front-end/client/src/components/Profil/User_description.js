import React from 'react';
import profilPic from '../../images/Photos de profil groupomania/zeus_arte.PNG';


const User_description = () => {
    return (
        <section className='user-description-box'>
            <div className="profil-pic">
                <img src={profilPic} alt="Photo de profil de l'utilisateur" />
            </div>
            <div className="biography">
                <h3 className="biography-title">
                    Biographie
                </h3>
                <div className="biography-content">
                    "Après 30 ans dans le secteur de l'électricité, me voici fraîchement débarqué chez Groupomania"
                </div>
            </div>
            <div className="informations">
                <h3 className="informations-title">
                    Informations
                </h3>
                <div className="informations-content">
                    <p>Date de naissance:</p><span>15 janvier 1956</span>
                    <p>Email:</p><span>zeus@gmail.com</span>
                    <p>Téléphone:</p><span>+33673519463</span>
                    <p>Adresse:</p><span>3 rue Pégase, Olympe</span>
                </div>
            </div>
        </section>
    );
};

export default User_description;