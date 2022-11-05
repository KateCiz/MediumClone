import React,{useState} from "react";
import AllStoriesFeed from './AllStoriesFeed';
import UserStoryFeed from './UserStoryFeed';
import "./FeedSwitch.css"

const FeedSwitch = ({user}) => {

    const [allFeed, setAllFeed] = useState(false)
    const handleFeedSwitch = () => {
        setAllFeed(!allFeed)
    }

    return (
      <div className="feed-switch-container">
        <div>
          <button onClick={handleFeedSwitch}>For you</button>
          <button onClick={handleFeedSwitch}>All</button>
        </div>
        {allFeed === true ?
            <AllStoriesFeed /> :
            <UserStoryFeed user={user}/>
        }
      </div>
    );

}


export default FeedSwitch;
