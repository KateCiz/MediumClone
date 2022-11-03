import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileFeed } from "../../store/stories"
import "./index.css";
import AuthorStoryPreview from "./AuthorStoryPreview";

function AuthorStoryFeed({ stories}) {
    // const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [loaded, setLoaded] = useState(false)


    // useEffect(() => {
    //   (async() => {
    //     await dispatch(getProfileFeed());
    //     setLoaded(true);
    //   })();
    // }, [dispatch]);


    if (!loaded) {
      return null;
    }


    return (
      <div className="feed-div">
        <div className="feed-preview-stories">
          {stories?.map((story, i) => {
              return (
              <NavLink key={i} to={`/stories/${story.id}`} style={{ textDecoration: "none" }}>
                 <AuthorStoryPreview story={story}/>
              </NavLink>
            );
          })}
        </div>
      </div>
    );
}

export default AuthorStoryFeed;
