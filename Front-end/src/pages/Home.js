import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/Profil/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const Home = () => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    return(
        <div className="home-page">
            <div className="background-transparent">
                <div className="home-container">
                    <NavBar user_info={objectUser} />
                    <main>
                        <section className="left-container">
                            <div className="user-identity">
                                <div className="user-picture">
                                    <img src={objectUser.profil_pic} alt="" />
                                </div>
                                <div className="user-name-container">
                                    <h4>{objectUser.first_name}, {objectUser.last_name}</h4>
                                    <p>{objectUser.email}</p>
                                </div>
                            </div>
                            <div className="likes-container">
                                <div className="likes-header">
                                    <FontAwesomeIcon icon={ faHeart } />
                                    <span>Vos derniers likes</span>
                                </div>
                                <div className="title-line">
                                    <div className="purple-line"></div>
                                </div>
                                <ul className="likes-list">

                                </ul>
                            </div>
                        </section>
                        <section className="middle-container">
                            <div className="last-pictures"></div>
                            <div className="input-area"></div>
                            <div className="news-feed"></div>
                        </section>
                        <section className="right-container">
                            <div className="friends"></div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Home;