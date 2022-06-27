import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPaperPlane} from '@fortawesome/free-solid-svg-icons'

const InputHome = ({user_info}) => {

    const imgUrl = user_info.profil_pic;

    return (
        <div className="input-area">
            <div className="user-picture-input">
                <img src={imgUrl} alt="utilisateur" />
            </div>
            <div className="input-text">
                <input type="text" placeholder={`Quoi de neuf, ${user_info.first_name} ?`}/>
            </div>
            <div className="buttons-icons">
            <FontAwesomeIcon icon={ faImage } />
            <FontAwesomeIcon icon={ faPaperPlane }/>
            </div>
        </div>
    );
};

export default InputHome;