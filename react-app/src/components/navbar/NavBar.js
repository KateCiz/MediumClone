import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import HorizontalNavBar from "./HorizontalNavBar/HorizontalNavBar"
import VerticalNavBar from './VerticalNavBar/VerticalNavBar';
import MainNavBar from './MainPageNavBar/index'
import WriteStoryNavBar from './WriteStoryNavBar/index';

const NavBar = () => {
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
    {console.log(history.location.pathname)}
    {console.log(!sessionUser)}
    {console.log(history.location.path ==='/')}
    { !sessionUser && history.location.path == "/" && <MainNavBar /> }
    { sessionUser && history.location.path === '/' ? (<VerticalNavBar user={sessionUser}/>) : null}
    </>
  );
}

export default NavBar;
