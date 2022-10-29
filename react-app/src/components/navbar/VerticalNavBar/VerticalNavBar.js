import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./VerticalNavBar.css";
import { FiEdit, FiBookmark, FiHome } from "react-icons/fi";
import ProfileButton from "../ProfileButton"

const VerticalNavBar = ({user, isLoaded }) => {

  return (
    <div className="SideBar">
      <nav>
        <NavLink
          to="/"
          exact={true}
          activeClassName="active"
          style={{ textDecoration: "none" }}
          className="logo-btn"
        >
          <i className="fa-brands fa-medium medlogo"></i>
        </NavLink>
        <ul>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <FiHome className="navbaricon"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <FiBookmark className="navbaricon"/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <FiEdit className="navbaricon" />
            </NavLink>
          </li>
        </ul>
        <ProfileButton user={user} />
      </nav>
    </div>
  );
};

export default VerticalNavBar;
