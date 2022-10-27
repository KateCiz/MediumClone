import React from 'react';
import {useSelector} from 'react-redux';
import HorizontalNavBar from "./HorizontalNavBar/HorizontalNavBar"
import VerticalNavBar from './VerticalNavBar/VerticalNavBar';

const NavBar = () => {

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
    { sessionUser ? (<VerticalNavBar user={sessionUser}/>) : (<HorizontalNavBar />)}
    </>
  );
}

export default NavBar;
