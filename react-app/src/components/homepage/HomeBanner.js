import React from "react"
import "./HomeBanner.css"

const HomeBanner = () => {
    return (
      <div className="HomeBanner-container">
        <div className="HomeBanner-main-text">
          <div className="HomeBanner-main-header">
            <h1>Stay curious.</h1>
          </div>
          <div className="HomeBanner-sub-text">
            <h2>Discover stories, thinking, and expertise</h2>
            <h2>from writeres on any topic.</h2>
          </div>
          <button className="start-reading-btn">Start reading</button>
        </div>
        <div className="medium-img">
          <img className="medium-ms" src={"../homepageMs.svg"} alt="" />
        </div>
      </div>
    );
}


export default HomeBanner;
