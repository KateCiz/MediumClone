import React from "react";
import { NavLink } from "react-router-dom";
import "./HorizontalNavBar.css"
import SignupFormModal from '../../auth/signupmodal/index'
import LoginFormModal from '../../auth/signinmodal/index'

const HorizontalNavBar = () => {
  return (
    <nav className="navbar-container">
      <NavLink to="/" className="site-logo">
        <img className="medium-logo-main" src={"../MediumLogo.ico"} alt="" />
      </NavLink>
      <ul>
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
          <NavLink
            to="/users"
            exact={true}
            activeClassName="active"
            style={{ textDecoration: "none" }}
          >
            Sign in
          </NavLink>
        </li>
        <li>
          <SignupFormModal />
        </li>
      </ul>
    </nav>
  );
};

export default HorizontalNavBar;
