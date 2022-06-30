import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftSection from '../components/Home/LeftSection';
import MiddleSection from '../components/Home/MiddleSection';
import RightSection from '../components/Home/RightSection';
import NavBarHome from '../components/Home/NavBarHome';
import { getUserPosts } from '../actions/user_posts.actions';


const Home = () => {

    const userData = useSelector((state) => state.userReducer);
    let objectUser = {};

    if (Object.keys(userData).length !== 0) {
        objectUser = userData.results[0];
    }

    const userId = objectUser.user_id;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPosts(userId));
    }, [dispatch, userId]);

    return(
        <div className="home-page">
            <div className="background-transparent">
                <div className="home-container">
                    <NavBarHome user_info={objectUser} />
                    <main>
                        <LeftSection user_info={objectUser}/>
                        <MiddleSection user_info={objectUser}/>
                        <RightSection />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Home;