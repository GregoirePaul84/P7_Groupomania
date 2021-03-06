import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import UserPosts from './UserPosts';
import { sendPost } from '../../actions/post.actions';
import { useDispatch } from 'react-redux';
import { getUserPosts } from '../../actions/user_posts.actions';

const Posts = (props) => {

    const objectUser = props.user_info;
    const userId = objectUser.user_id;

    const [file, setFile] = useState(false);
    
    const dispatch = useDispatch();

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
            .then(() => dispatch(getUserPosts(userId)));
            setFile(false);
            // removeColorIcon();
    }

    useEffect(() => {
        if (file) {
            const selectIcon = document.querySelector('.input-box path');
            selectIcon.style.color = '#8D76FF';
        }
        else if (file === false) {
            const selectIcon = document.querySelector('.input-box path');
            selectIcon.style.color = 'inherit';
            document.querySelector('.input-file').value = '';
        }

    }, [file])

    return (
        <section className='main-section-profil'>
            <div className="flex-container">
                <div className="user-name">
                    <div className="cellphone-profil-pic">
                        <img src={objectUser.profil_pic} alt="utilisateur mobile" />
                    </div>
                    <h2>{objectUser.first_name}, {objectUser.last_name}</h2>
                </div>
            </div>
            <div className="input-pictures-contact-box">
                <form className="input-box">
                    <input type="text" placeholder={`Quoi de neuf, ${objectUser.first_name} ?`} className="input-send-post" />
                    <FontAwesomeIcon icon={ faImage } />
                    <input type="file" 
                            className='input-file'
                            name="post_images"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={(e) => setFile(e.target.files[0])} />
                    <FontAwesomeIcon icon={ faPaperPlane } onClick={writePost}/>
                </form>
                { (file) ? <button onClick={(e) => setFile(false)}>Annuler l'image</button> : null}
            </div>
            <div className="posts">
                <div className="posts-title-box">
                    <h3 className="user-titles">Publications</h3>
                    <div className="purple-line"></div>
                </div>
                <UserPosts user_info={objectUser}/>
            </div>
        </section>
    );
};

export default Posts;