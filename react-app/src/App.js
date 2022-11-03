import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import HorizontalNavBar from './components/navbar/HorizontalNavBar/HorizontalNavBar';
import VerticalNavBar from "./components/navbar/VerticalNavBar/VerticalNavBar";
import MainPage from "./components/homepage/index";
import UserProfile from './components/Profile/ProfilePage';
import Footer from './components/Footer/footer';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import HomePage from "./components/homepage/index";
import WritePage from "./components/writepage/index";
import EditPage from "./components/writepage/editpage/index";
import FullStoryPage from "./components/StoryPage/FullStoryPage";
import AboutUs from "./components/AboutPage/AboutUs";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        {loaded && (
          <Switch>
            <Route path="/" exact={true}>
              <NavBar />
              <HomePage />
            </Route>
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/new-story" exact={true}>
              <WritePage />
            </ProtectedRoute>
            <ProtectedRoute path="/edit-story/:storyId" exact={true}>
              <EditPage />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <Route path="/stories/:storyId" exact={true}>
              <NavBar />
              <FullStoryPage />
            </Route>
            <Route path='/about' exact={true}>
              <AboutUs />
            </Route>
            <Route path="/profiles/:userId" exact={true}>
              <UserProfile/>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        )}
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
