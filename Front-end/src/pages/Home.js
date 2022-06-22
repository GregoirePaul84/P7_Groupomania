import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from '../components/Profil/NavBar';
import LeftSection from '../components/Home/LeftSection';


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
                        <LeftSection user_info={objectUser}/>
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