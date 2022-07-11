import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPicturesPost } from '../../actions/post.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faImages } from '@fortawesome/free-solid-svg-icons';

const Stories = () => {

    const dispatch = useDispatch();

    const [showPicture, setShowPicture] = useState(false);
    const [picture, setPicture] = useState();
    
    useEffect(() => {

        dispatch(getPicturesPost());
    }, [dispatch]);

    useEffect(() => {
        if(showPicture) {

            // Création de la modale image de post
            const createDiv = document.createElement("div");
            createDiv.className = "picture-modal";
            
            const selectRoot = document.getElementById('root');
            selectRoot.appendChild(createDiv);
            
            const createImg = document.createElement("img");
            createImg.setAttribute("src", `${picture}`);
            
            const selectPictureModal = document.querySelector('.picture-modal');
            selectPictureModal.appendChild(createImg);
            
            const createCrossSpan = document.createElement("span");
            createCrossSpan.className = "cross-span";
            createCrossSpan.textContent = "x";
            selectPictureModal.appendChild(createCrossSpan);

            document.querySelector('.home-page').style.filter = "blur(5px)";

            // Ecoute du clic pour fermer la modale en cas de clic extérieur
            createCrossSpan.onclick = function() {  
                setShowPicture(false);
            }
        }
        
        if(showPicture === false && document.querySelector('.picture-modal') !== null) {

            const selectPictureModal = document.querySelector('.picture-modal');
            selectPictureModal.remove();

            document.querySelector('.home-page').style.filter = "blur(0)";
        }

    // eslint-disable-next-line
    }, [showPicture]);

    const picturesData = useSelector((state) => state.postReducer);
    let picturesObject = {};

    if (Object.keys(picturesData).length !== 0) {
        picturesObject = picturesData.results;
    }
    else {
        return;
    }

    function moveRight() {
        console.log("droite");
        const selectBox = document.querySelector('.stories');
        console.log(selectBox);
        selectBox.scrollBy(20, 0);
    }

    if(picturesObject === undefined) return;
    
    if (picturesObject.length !== 0) {
        return (
            <div className="stories">
                {picturesObject.map((key) => {
                    return (
                        <div key={key.post_image_id} className="picture-container">
                            <img src={key.image_url} 
                                 alt="dernières photos postées" 
                                 onClick={ (e) => [setShowPicture(!showPicture), setPicture(key.image_url)]} />
                        </div>)     
                })}
                <div className="arrow-right">
                    <FontAwesomeIcon icon={ faAngleRight} onClick={moveRight}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="no-stories">
                <FontAwesomeIcon icon={ faImages} />
                Aucun utilisateur n'a encore posté d'image...
            </div>
        )
    }
    
};

export default Stories;