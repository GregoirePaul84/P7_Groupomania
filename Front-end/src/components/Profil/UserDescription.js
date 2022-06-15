import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCakeCandles, faLocationDot, faPhone} from '@fortawesome/free-solid-svg-icons';
import ChangeProfilPic from './ChangeProfilPic';

const User_description = (props) => {

    const objectUser = props.user_info;
        
    return (
        <section className='user-description-box'>
            <div className="profil-pic-name_box">
                <div className="profil-pic">
                    <ChangeProfilPic />
                    <img src={objectUser.profil_pic} alt="Utilisateur" />
                </div>
            </div>
            <div className="biography">
                <div className="title-line">
                    <h3 className="user-titles">
                        Biographie
                    </h3>
                    <div className="purple-line"></div>
                </div>
                {(objectUser.bio) ?
                    <div className="biography-content">
                        {objectUser.bio}
                    </div>
                    : <span className="biography-content">
                        Vous pouvez ajouter une biographie et mettre à jour vos informations depuis les paramètres!
                      </span>}
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
                        <FontAwesomeIcon icon={ faCakeCandles } />
                        <span className='info-key'>Date de naissance:</span>
                        {(objectUser.date_naissance) ?
                        <span className='info-value'>{objectUser.date_naissance}</span> 
                        : <span className='info-value'>non précisée</span>}
                    </div>
                    <div className="info-box">
                        <FontAwesomeIcon icon={ faAt } />
                        <span className='info-key'>Email:</span>
                        <span className='info-value'>{objectUser.email}</span>
                    </div>
                    <div className="info-box">
                        <FontAwesomeIcon icon={ faPhone } />
                        <span className='info-key'>Téléphone:</span>
                        {(objectUser.tel) ?
                        <span className='info-value'>{objectUser.tel}</span>
                        : <span className='info-value'>non précisé</span>}
                    </div>
                    <div className="info-box">
                        <FontAwesomeIcon icon={ faLocationDot } />
                        <span className='info-key'>Adresse:</span>
                        {(objectUser.adresse) ?
                        <span className='info-value'>{objectUser.adresse}</span>
                        : <span className='info-value'>non précisée</span>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User_description;