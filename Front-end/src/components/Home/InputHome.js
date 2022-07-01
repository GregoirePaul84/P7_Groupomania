import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { getAllPosts, sendPost } from '../../actions/post.actions';
import { useDispatch } from 'react-redux';

const InputHome = ({user_info}) => {

    const imgUrl = user_info.profil_pic;
    const userId = user_info.user_id;

    const dispatch = useDispatch();

    const [file, setFile] = useState(false);

    async function writePost() {

        const text = document.querySelector('.input-send-post').value;
        const data = new FormData();

        if (text.length === 0 && file === false) {
            alert("Veuillez écrire quelque chose ou envoyez une image");
            return;
        }

        if (file) {
            data.append('post_image', file);
        }
        
        data.append('text', text);
        
        await dispatch(sendPost(data, userId))
            .then(() => document.querySelector('.input-send-post').value = '')
            // .then(() => document.querySelector('.input-file').value = '')
            .then(() => dispatch(getAllPosts()));
            setFile(false);
            // removeColorIcon();
    }

    return (
        <div className="input-area">
            <div className="user-picture-input">
                <img src={imgUrl} alt="utilisateur" />
            </div>
            <div className="input-text">
                <input type="text" className="input-send-post" placeholder={`Quoi de neuf, ${user_info.first_name} ?`}/>
            </div>
            <div className="buttons-icons">
            <FontAwesomeIcon icon={ faImage } />
            <FontAwesomeIcon icon={ faPaperPlane } onClick={writePost}/>
            </div>
        </div>
    );
};

export default InputHome;