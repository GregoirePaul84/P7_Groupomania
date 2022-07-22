import React from 'react';
import { useSelector } from 'react-redux';
import FriendCard from './FriendCard';

const FriendPosts = (props) => {

    const objectUser = props.user_info;
    const userId = objectUser.user_id;
    
    const allPostsData = useSelector((state) => state.allPostsReducer);
    let allPosts = {};
    let friendPosts = {};

    if (Object.keys(allPostsData).length !== 0) {
        allPosts = allPostsData.results;
        const filterPosts = allPosts.filter(elt => elt.user_id === userId)
        friendPosts = filterPosts;
    }
    if (friendPosts.length === undefined) {
        return;
    }

    if (friendPosts.length === 0) {
        return (
            <section className='main-section-profil'>
                <div className="flex-container">
                    <div className="user-name">
                        <div className="cellphone-profil-pic">
                            <img src={objectUser.profil_pic} alt="" />
                        </div>
                        <h2>{objectUser.first_name}, {objectUser.last_name}</h2>
                    </div>
                </div>
                <div className="posts">
                    <div className="posts-title-box">
                        <h3 className="user-titles">Publications</h3>
                        <div className="purple-line"></div>
                    </div>
                </div>
                <div className="user-posts-container">
                    <div className="card-container">
                        <div className="card-smallContainer">
                            <div className="card-user-picture">
                                <img src={objectUser.profil_pic} alt="utilisateur" />
                            </div>
                            <div className="card-name-user">
                                <h3>{objectUser.first_name}, {objectUser.last_name}</h3>
                                <p>{objectUser.email}</p>
                            </div>
                            <div className="card-message">
                                <div className="post-content">
                                    <div className='message'>
                                    {objectUser.first_name} n'a encore rien écrit... 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>        
        );
    }
    else {
        return (
            <section className='main-section-profil'>
                <div className="flex-container">
                    <div className="user-name">
                        <div className="cellphone-profil-pic">
                            <img src={objectUser.profil_pic} alt="" />
                        </div>
                        <h2>{objectUser.first_name}, {objectUser.last_name}</h2>
                    </div>
                </div>
                <div className="posts">
                    <div className="posts-title-box">
                        <h3 className="user-titles">Publications</h3>
                        <div className="purple-line"></div>
                    </div>
                </div>
                <div className="user-posts-container">
                {friendPosts.map((post) => {
                    return <FriendCard post={post} key={post.post_id} objectUser={objectUser} /> })
                }
                </div>
            </section>        
        ); 
    }
    
};

export default FriendPosts;