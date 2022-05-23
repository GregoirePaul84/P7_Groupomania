import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faAt, faCakeCandles, faLocationDot, faPhone} from '@fortawesome/free-solid-svg-icons'

const User_description = (props) => {

    const objectUser = props.user_info;
        
    return (
        <section className='user-description-box'>
            <div className="profil-pic-name_box">
                <div className="profil-pic">
                    <div className="change-profil-pic">
                        <FontAwesomeIcon icon={ faCamera } />
                    </div>
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
                <div className="biography-content">
                    {objectUser.bio}
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
                        <FontAwesomeIcon icon={ faCakeCandles } />
                        <span className='info-key'>Date de naissance:</span>
                        <span className='info-value'>{objectUser.date_naissance}</span>
                    </div>
                    <div className="info-box">
                        <FontAwesomeIcon icon={ faAt } />
                        <span className='info-key'>Email:</span><span className='info-value'>{objectUser.email}</span>
                    </div>
                    <div className="info-box">
                        <FontAwesomeIcon icon={ faPhone } />
                        <span className='info-key'>Téléphone:</span><span className='info-value'>{objectUser.tel}</span>
                    </div>
                    <div className="info-box">
                        <FontAwesomeIcon icon={ faLocationDot } />
                        <span className='info-key'>Adresse:</span>
                        <span className='info-value'>{objectUser.adresse}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default User_description;