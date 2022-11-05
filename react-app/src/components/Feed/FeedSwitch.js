import React,{useState} from "react";
import AllStoriesFeed from './AllStoriesFeed';
import UserStoryFeed from './UserStoryFeed';
import "./FeedSwitch.css"

const FeedSwitch = ({user}) => {

    const [allFeed, setAllFeed] = useState(true)
    const handleAllSwitch = () => {
        setAllFeed(true)
  }
    const handleFypSwitch = () => {
      setAllFeed(false)
    }

    return (
      <div className="feed-switch-container">
        <div className="feed-btns">
          <button
            className={allFeed ? "feed-btn-select" : "feed-btn"}
            onClick={handleAllSwitch}
          >
            All
          </button>
          <button
            className={allFeed ? "feed-btn" : "feed-btn-select"}
            onClick={handleFypSwitch}
          >
            For you
          </button>
        </div>
        {allFeed === true ? <AllStoriesFeed /> : <UserStoryFeed user={user} />}
      </div>
    );

}


export default FeedSwitch;
