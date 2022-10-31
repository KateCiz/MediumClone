import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSingleStory } from "../../store/stories";
import OneStory from "./OneStory";
import AuthorSideBar from "./AuthorSideBar";
import "./index.css";

function FullStoryPage() {
  const { storyId } = useParams();
  const story = useSelector((state) => state.storyState[storyId]);
  const dispatch = useDispatch();
  // const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async() => {
      await dispatch(getSingleStory(storyId));
      // setLoaded(true);
    })();
  }, [dispatch]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <div className="full-page-story-div">
      <div className="full-page-story-details-div">
        <OneStory story={story} />
      </div>
      <div className="author-side-div">
        <NavLink key={story?.user_id} to={`/profiles/${story?.user_id}`} style={{ textDecoration: "none" }}>
          <AuthorSideBar Author={story?.Author}/>
        </NavLink>
      </div>
    </div>
  );
}

export default FullStoryPage;