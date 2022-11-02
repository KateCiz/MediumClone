import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/navbar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import HomePage from "./components/homepage/index";
import WritePage from "./components/writepage/index";
import EditPage from "./components/writepage/editpage/index";
import FullStoryPage from "./components/StoryPage/FullStoryPage";
import VerticalNavBar from "./components/navbar/VerticalNavBar/VerticalNavBar";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

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
          </Switch>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
