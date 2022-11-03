import React from "react";
import { NavLink } from "react-router-dom";
import "./HorizontalNavBar.css"
import SignupFormModal from '../../auth/signupmodal/index'
import LoginFormModal from '../../auth/signinmodal/index'
import DemoAccount from '../../auth/DemoAccount/index'

const HorizontalNavBar = () => {
  return (
    <nav className="navbar-container">
      <NavLink to="/" className="site-logo">
        <img className="medium-logo-main" src={"../Medium.svg"} alt="" />
      </NavLink>
      <ul>
        <li>
          <DemoAccount />
        </li>
        <li>
          <NavLink
            to="/login"
            exact={true}
            activeClassName="active"
            style={{ textDecoration: "none" }}
          >
            Write
          </NavLink>
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

export default HorizontalNavBar;
