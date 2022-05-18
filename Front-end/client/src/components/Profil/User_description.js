import React from 'react';
import profilPic from '../../images/Photos de profil groupomania/zeus_arte.PNG';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot} from '@fortawesome/free-solid-svg-icons'


const User_description = () => {
    return (
        <section className='user-description-box'>
            <div className="profil-pic-name_box">
                <div className="profil-pic">
                    <img src={profilPic} alt="Utilisateur" />
                </div>
                <div className="user-name">
                    <h2>Zeus, Dieu des dieux</h2>
                    <FontAwesomeIcon icon={ faLocationDot } /><span>Palais de l'olympe</span>
                </div>
            </div>
            <div className="biography">
                <div className="title-line">
                    <h3 className="user-titles">
                        Biographie
                    </h3>
                    <div className="purple-line"></div>
                </div>
                <div className="biography-content">
                    "Après 30 ans dans le secteur de l'électricité, me voici fraîchement débarqué chez Groupomania"
                </div>
            </div>
            <div className="informations">
                <div className="title-line">
                    <h3 className="user-titles">
                        Informations
                    </h3>
                    <div className="purple-line"></div>
                </div>
                <div className="informations-content">
                    <div className="info-box">
                        <span className='info-key'>Date de naissance:</span><span className='info-value'>15 janvier 1956</span>
                    </div>
                    <div className="info-box">
                        <span className='info-key'>Email:</span><span className='info-value'>zeus@gmail.com</span>
                    </div>
                    <div className="info-box">
                        <span className='info-key'>Téléphone:</span><span className='info-value'>+33673519463</span>
                    </div>
                    <div className="info-box">
                        <span className='info-key'>Adresse:</span><span className='info-value'>3 rue Pégase, Olympe</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User_description;