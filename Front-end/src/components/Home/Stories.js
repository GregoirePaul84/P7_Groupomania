import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPicturesPost } from '../../actions/post.actions';

const Stories = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(getPicturesPost());
    }, []);

    const picturesData = useSelector((state) => state.postReducer);
    let picturesObject = {};

    if (Object.keys(picturesData).length !== 0) {
        picturesObject = picturesData.results;
        console.log(picturesObject);
    }
    else {
        return;
    }

    console.log(picturesData);

    return (
        <div className="stories">
            {picturesObject.map((key) => {
                if (Object.keys(picturesObject).length !== 0) {     
                    picturesObject = picturesData.results;
                    return (
                        <div key={key.post_image_id} className="picture-container">
                            <img src={key.image_url} alt="" />
                        </div>)   
                }
                else {
                    return (null)
                }
            })}
        </div>
    );
};

export default Stories;