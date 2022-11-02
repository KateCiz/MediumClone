import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HorizontalNavBar from './components/navbar/HorizontalNavBar/HorizontalNavBar';
import VerticalNavBar from "./components/navbar/VerticalNavBar/VerticalNavBar";
import MainPage from "./components/homepage/index"
import CommentsBar from './components/comments/CommentsBar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    (async() => {
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
        { loaded && (
        <Switch>
          <Route path="/" exact={true}>
            <NavBar />
            <MainPage />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <Route path="/test" exact={true}>
            <NavBar />
            <MainPage />
            {showComments && <CommentsBar id={3} type={'story'} setDisplay={setShowComments} />}
          </Route>
        </Switch>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
