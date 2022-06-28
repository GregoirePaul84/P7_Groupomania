import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPicturesPost } from '../../actions/post.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

const Stories = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(getPicturesPost());
    }, [dispatch]);

    const picturesData = useSelector((state) => state.postReducer);
    let picturesObject = {};

    if (Object.keys(picturesData).length !== 0) {
        picturesObject = picturesData.results;
    }
    else {
        return;
    }
    console.log(picturesObject);

    if (picturesObject.length !== 0) {
        return (
            <div className="stories">
                {picturesObject.map((key) => {
                    return (
                        <div key={key.post_image_id} className="picture-container">
                            <img src={key.image_url} alt="dernières photos postées" />
                        </div>)     
                })}
            </div>
        );
    }
    else {
        return (
            <div className="no-stories">
                <FontAwesomeIcon icon={ faImages} />
                Aucune utilisateur n'a encore posté d'images...
            </div>
        )
    }
    
};

export default Stories;