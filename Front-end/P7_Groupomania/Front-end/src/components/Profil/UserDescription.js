import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCakeCandles, faLocationDot, faPhone} from '@fortawesome/free-solid-svg-icons';
import ChangeProfilPic from './ChangeProfilPic';
import { useParams } from 'react-router-dom';

const User_description = (props) => {

    const objectUser = props.user_info;
    const userId = objectUser.user_id;

    const {user_id} = useParams();
    const paramsId = parseInt(user_id, 10);

    if(objectUser.adresse === undefined) return;
       
    return (
        <aside className='user-description-box'>
            <div className="profil-pic-name_box">
                {(userId === paramsId) ?
                <div className="profil-pic">
                    <ChangeProfilPic />
                    <img src={objectUser.profil_pic} alt="Utilisateur" />
                </div>
                : <div className="profil-pic">
                    <img src={objectUser.profil_pic} alt="Utilisateur" />
                  </div> }
            </div>
            <div className="biography">
                <div className="title-line">
                    <h3 className="user-titles">
                        Biographie
                    </h3>
                    <div className="purple-line"></div>
                </div>
                {(objectUser.bio !== 'null' && objectUser.bio !== null) ?
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
                        <span className='info-key'>
                            <FontAwesomeIcon icon={ faCakeCandles } />
                            Date de naissance:
                        </span>
                        {(objectUser.date_naissance !== 'null' && objectUser.date_naissance !== null) ?
                        <span className='info-value'>{objectUser.date_naissance}</span> 
                        : <span className='info-value'>non précisée</span>}
                    </div>
                    <div className="info-box">
                        <span className='info-key'>
                            <FontAwesomeIcon icon={ faAt } />
                            Email:
                        </span>
                        <span className='info-value'>{objectUser.email}</span>
                    </div>
                    <div className="info-box">
                        <span className='info-key'>
                            <FontAwesomeIcon icon={ faPhone } />
                            Téléphone:
                        </span>
                        {(objectUser.tel !== 'null' && objectUser.tel !== null) ?
                        <span className='info-value'>{objectUser.tel}</span>
                        : <span className='info-value'>non précisé</span>}
                    </div>
                    <div className="info-box">
                        <span className='info-key'>
                        <FontAwesomeIcon icon={ faLocationDot } />
                            Adresse:
                        </span>
                        {(objectUser.adresse !== 'null' && objectUser.adresse !== null) ?
                        <span className='info-value'>{objectUser.adresse}</span>
                        : <span className='info-value'>non précisée</span>}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default User_description;