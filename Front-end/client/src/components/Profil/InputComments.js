import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment} from '@fortawesome/free-solid-svg-icons'

const InputComments = (props) => {

    const postId = props.postId;
    const objectUser = props.infoUser;
    
    return (
        // eslint-disable-next-line
        <div className={"input-comments-container " + "input-post_id" + postId}>
            <div className="flex-container">
                <div className="input-comments-smallContainer">
                    <div className="input-comments-user-picture">
                        <img src={objectUser.profil_pic} alt="utilisateur" />
                    </div>
                    <div className="input-comments-name-user">
                        <h3>{objectUser.first_name}, {objectUser.last_name}</h3>
                        <p>{objectUser.email}</p>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder={`Ecrivez un commentaire !`} className="input-send-post" />
                        <FontAwesomeIcon icon={ faComment } onClick={console.log("writePost")}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputComments;