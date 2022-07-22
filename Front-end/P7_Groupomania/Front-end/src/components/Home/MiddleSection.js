import React from 'react';
import InputHome from './InputHome';
import NewsFeed from './NewsFeed';
import Stories from './Stories';

const MiddleSection = ({user_info}) => {
    const objectUser = user_info;

    return (
        <section className="middle-container">
            <Stories />
            <InputHome user_info={objectUser}/>
            <NewsFeed />
        </section>
    );
};

export default MiddleSection;