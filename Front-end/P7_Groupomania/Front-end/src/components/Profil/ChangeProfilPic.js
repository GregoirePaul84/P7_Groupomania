import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getUser, uploadProfil } from '../../actions/user.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const ChangeProfilPic = () => {

    const [file, setFile] = useState();

    const dispatch = useDispatch();

    let userData = useSelector((state) => state.userReducer);
    userData = userData.results;

    if (userData === undefined) {
        return;
    }
    
    const userId = userData[0].user_id;

    function handlePicture(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('profil_image', file);
        console.log(data.get('profil_image'));

        dispatch(uploadProfil(data, userId))
            .then(() => dispatch(getUser(userId)));
        setFile(false);
    }


    return (
        <form action="" className="change-profil-pic" onSubmit={handlePicture}>
            <label htmlFor="file"></label>
            <input type="file" 
                   id="file"
                   name="profil_image"
                   className='select_image'
                   accept=".jpg, .jpeg, .png" 
                   onChange={(e) => setFile(e.target.files[0])} />
            <FontAwesomeIcon icon={ faCamera } />
            <input type="submit" value="Envoyer" className='submit_image' style={file ? {display: "block"} : {display: "none"}}/>      
        </form>
    );
};

export default ChangeProfilPic;