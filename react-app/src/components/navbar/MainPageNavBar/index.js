import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import SignupFormModal from "../../auth/signupmodal/index";
import LoginFormModal from "../../auth/signinmodal/index";
import DemoAccount from "../../auth/DemoAccount/index";
import LoginPopUpModal from "../../auth/LoginPopUp";

const MainNavBar = () => {
  const [navBar, setNavBar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 530) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  useEffect(() => {
    changeBackground();
    // adding the event when scroll change background
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <nav className={navBar ? "navbar-container" : "navbar-container-change"}>
      <NavLink to="/" className="site-logo">
        <img className="medium-logo-main" src={"/svgs/Medium.svg"} alt="" />
      </NavLink>
      <ul>
        <li>
          <DemoAccount />
        </li>
        <li>
          {/* <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            style={{ textDecoration: "none" }}
          >
            Write
          </NavLink> */}
          <LoginPopUpModal location='write' />
        </li>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignupFormModal />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavBar;
