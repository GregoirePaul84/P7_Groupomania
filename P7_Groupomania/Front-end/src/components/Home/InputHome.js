import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { getAllPosts, getPicturesPost, sendPost } from '../../actions/post.actions';
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
            .then(() => document.querySelector('.input-file').value = '')
            .then(() => dispatch(getAllPosts()))
            .then(() => dispatch(getPicturesPost()));
            setFile(false);
    }

    useEffect(() => {
        if (file) {
            const selectIcon = document.querySelector('.fa-image path');
            selectIcon.style.color = '#8D76FF';
        }
        else if (file === false) {
            const selectIcon = document.querySelector('.fa-image path');
            selectIcon.style.color = 'inherit';
            document.querySelector('.input-file').value = '';
        }

    }, [file])

    return (
        <div className="input-area">
            <div className="flex-container">
                <div className="user-picture-input">
                    <img src={imgUrl} alt="utilisateur" />
                </div>
                <div className="input-text">
                    <input type="text" className="input-send-post" placeholder={`Quoi de neuf, ${user_info.first_name} ?`}/>
                </div>
                <div className="buttons-icons">
                <FontAwesomeIcon icon={ faImage } />
                <input type="file"
                                className='input-file'
                                name="post_images"
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={(e) => setFile(e.target.files[0])} />
                <FontAwesomeIcon icon={ faPaperPlane } onClick={writePost}/>
                </div>
            </div>
        </div>
    );
};

export default InputHome;