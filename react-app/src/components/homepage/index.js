import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import UserStoryFeed from '../Feed/UserStoryFeed';
import AllStoriesFeed from '../Feed/AllStoriesFeed';

const HomePage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div>
            {sessionUser && <UserStoryFeed user={sessionUser}/>}
            {!sessionUser && <AllStoriesFeed />}
        </div>
    )
}

export default HomePage;
