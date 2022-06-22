import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faImage} from '@fortawesome/free-solid-svg-icons'
import { getComments, increaseNbOfComments, sendComment } from '../../actions/comment.actions';
import { useDispatch } from 'react-redux';
import { getUserPosts } from '../../actions/user_posts.actions';

const InputComments = (props) => {
    
    const postId = props.postId;
    const objectUser = props.infoUser;
    const userId = props.userId;

    const [file, setFile] = useState(false);

    const dispatch = useDispatch();

    async function writeComment() {
        const selectInput = document.querySelector(`.input-text-post_id${postId}`);
        console.log(selectInput);
            
        const commentContent = selectInput.value;
            
        if (file === false && commentContent === "") {
            alert("Veuillez écrire quelque chose ou envoyez une image");
            return;
        }

        const data = new FormData();
        data.append('text', commentContent);
        data.append('comment_image', file);
        data.append('post_id', postId);
        console.log(commentContent);
        
        await dispatch(sendComment(data))
            .then(() => dispatch(increaseNbOfComments(postId)))
            .then(() => dispatch(getUserPosts(userId)))
            .then(() => dispatch(getComments()))
            .then(() => selectInput.value = '');
            setFile(false);
        
    }
     
    useEffect(() => {
        if (file) {
            const selectIcon = document.querySelector(`.input-post_id${postId} path`);
            console.log(selectIcon);
            selectIcon.style.color = 'hsl(317deg 24% 45%)';
        }
        else if (file === false) {
            const selectIcon = document.querySelector(`.input-post_id${postId} path`);
            selectIcon.style.color = 'inherit';
        }
    // eslint-disable-next-line
    }, [file])

    return (
        // eslint-disable-next-line
        <div>
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
                        {/* eslint-disable-next-line */}
                        <input type="text" placeholder={`Ecrivez un commentaire !`} className={"input-text " + `input-text-post_id${postId}`} />
                        <FontAwesomeIcon icon={ faImage } />
                        <input type="file" 
                            className='input-file-comment'
                            name="comment_images"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={(e) => setFile(e.target.files[0])} />
                        <FontAwesomeIcon icon={ faComment } onClick={writeComment} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputComments;