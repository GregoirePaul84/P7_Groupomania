import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment} from '@fortawesome/free-solid-svg-icons'
import { sendComment } from '../../actions/post_comments.actions';
import { useDispatch } from 'react-redux';

const InputComments = (props) => {
    
    const postId = props.postId;
    const objectUser = props.infoUser;
    
    const dispatch = useDispatch();

    function writeComment() {
        const selectInput = document.querySelectorAll('.input-send-comment');
        let commentContent = undefined;
        
        for (let i in selectInput) {
            
            if (typeof selectInput[i].value === 'string' & selectInput[i].value !== '') {
                commentContent = selectInput[i].value;
            }
        }
        
        if (typeof commentContent === 'string' && commentContent !== '') {
            console.log(commentContent);
            dispatch(sendComment(commentContent, postId));
            
        }
    }
    
    
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
                        <input type="text" placeholder={`Ecrivez un commentaire !`} className="input-send-comment" />
                        <FontAwesomeIcon icon={ faComment } onClick={writeComment}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputComments;