import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPicturesPost } from '../../actions/post.actions';

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
                    if (Object.keys(picturesObject).length !== 0) {     
                        picturesObject = picturesData.results;
                        return (
                            <div key={key.post_image_id} className="picture-container">
                                <img src={key.image_url} alt="dernières photos postées" />
                            </div>)   
                    }
                    else {
                        return (null)
                    }
                })}
            </div>
        );
    }
    else {
        return (
            <div className="no-stories">
                Aucune image n'a encore été ajoutée !
            </div>
        )
    }
    
};

export default Stories;