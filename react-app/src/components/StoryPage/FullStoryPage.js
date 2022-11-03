import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSingleStory } from "../../store/stories";
import OneStory from "./OneStory";
import AuthorSideBar from "./AuthorSideBar";
import "./index.css";


function FullStoryPage() {
  const { storyId } = useParams();
  const story = useSelector((state) => state.storyState[storyId]);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [loaded, setLoaded] = useState(false)

  if(!story){
    history.push('/404');
  }

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
        <OneStory story={story} storyId={storyId} />
      </div>
      <div className="author-side-div">
          <AuthorSideBar Author={story?.Author}/>
      </div>
    </div>
  );
}

export default FullStoryPage;
