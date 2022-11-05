import React from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom'
import HorizontalNavBar from "./HorizontalNavBar/HorizontalNavBar"
import VerticalNavBar from './VerticalNavBar/VerticalNavBar';
import MainNavBar from './MainPageNavBar/index'
import WriteStoryNavBar from './WriteStoryNavBar/index';

const NavBar = () => {
  const location = useLocation()
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {!sessionUser && location.pathname === "/" && <MainNavBar />}
      {sessionUser && location.pathname === "/" && (
        <VerticalNavBar user={sessionUser} />
      )}
      {/* {sessionUser && location.pathname === "/new-story" && (
        <WriteStoryNavBar />
      )} */}
      {!sessionUser && location.pathname.slice(0, 8) === "/stories" && (
        <HorizontalNavBar />
      )}
      {sessionUser && location.pathname.slice(0, 8) === "/stories" && (
        <VerticalNavBar user={sessionUser} />
      )}
      {/* {sessionUser && location.pathname.slice(0, 10) === "/edit-story" && (
        <WriteStoryNavBar />
      )} */}
      {sessionUser && location.pathname.slice(0, 9) === "/profiles" && (
        <VerticalNavBar user={sessionUser} />
      )}
      {!sessionUser && location.pathname.slice(0, 9) === "/profiles" && (
        <HorizontalNavBar />
      )}
    </>
  );
}

export default NavBar;
