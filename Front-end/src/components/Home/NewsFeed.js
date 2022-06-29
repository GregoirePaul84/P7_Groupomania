import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../actions/post.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { getAllUsers } from '../../actions/user.actions';
import CardHome from './CardHome';

const NewsFeed = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllUsers());
    }, [dispatch]);

    const allPostsData = useSelector((state) => state.allPostsReducer);
    const allUsersData = useSelector((state) => state.userAllReducer);
    const allUsersResults = allUsersData.results;

    let postsObject = [];

    if (Object.keys(allPostsData).length !== 0) {
        postsObject = allPostsData.results;
    }
    else {
        return;
    }

    return (
        <div className='news-feed'>
            { (postsObject.length !== 0) ?
                postsObject.map((elt) => {
                    return (
                        <CardHome postsObject={postsObject} allUsersResults={allUsersResults} key={elt.post_id} elt={elt}/>
                    )
                })
                : <div className='no-post'>
                    <FontAwesomeIcon icon={ faMessage } />
                    Aucun utilisateur n'a encore posté...
                  </div> }    
        </div>
    );
};

export default NewsFeed;