import React from 'react';
import logo from '../images/icon-left-font-monochrome-white.svg';

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-container">
                <nav>
                    <div className="groupomania-logo">
                        <img src={ logo } alt="Logo de groupomania" />
                    </div>
                    <div className="user-logout">
                        <div className="logout-img-user">
                            <img src="" alt="" />
                        </div>
                        <div className="logout-content">
                            <h3>Zeus, dieu des dieux</h3>
                            <i></i>
                            <span>Se déconnecter</span>
                        </div>
                    </div>
                </nav>
                <main className="main-box">
                    <section className="profil-likes-params">
                        <div className="profil">
                            <div className="profil-img">
                                <img src="" alt="" />
                            </div>
                            <div className="profil-content">
                                <h2>Zeus, dieu des dieux</h2>
                                <p>zeus@gmail.com</p>
                            </div>
                        </div>
                        <div className="params-box">
                            
                        </div>
                        <div className="likes-box">
                            <div className="likes-title">
                                <i></i>
                                <h3>Vos likes</h3>
                            </div>
                            <div className="messages-liked-box">
                                <p className="messages-liked"></p>
                                <p className="messages-liked"></p>
                                <p className="messages-liked"></p>
                            </div>
                        </div>
                    </section>
                    <section className="stories-posts">
                        <div className="stories"></div>
                        <div className="new-post"></div>
                        <div className="friends-posts"></div>
                    </section>
                    <section className="online-friends">
                        <div className="connected-friends"></div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;