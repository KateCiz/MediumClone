import { useDispatch } from 'react-redux';
import UserProfile from './components/Profile/ProfilePage';
import Footer from './components/Footer/footer';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate, refreshUser } from "./store/session";
import HomePage from "./components/homepage/index";
import WritePage from "./components/writepage/index";
import EditPage from "./components/writepage/editpage/index";
import FullStoryPage from "./components/StoryPage/FullStoryPage";
import AboutUs from "./components/AboutPage/AboutUs";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
      dispatch(authenticate());
      dispatch(refreshUser()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
        {loaded && (
          <>
            <Switch>
              <Route path="/" exact={true}>
                <HomePage />
              </Route>
              <ProtectedRoute path="/new-story" exact={true}>
                <WritePage />
              </ProtectedRoute>
              <ProtectedRoute path="/edit-story/:storyId" exact={true}>
                <EditPage />
              </ProtectedRoute>
              <Route path="/stories/:storyId" exact={true}>
                <FullStoryPage />
              </Route>
              <Route path="/about" exact={true}>
                <AboutUs />
              </Route>
              <Route path="/profiles/:userId" exact={true}>
                <UserProfile />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
            <Footer />
            <NavBar />
          </>
        )}
    </>
  );
}

export default App;
