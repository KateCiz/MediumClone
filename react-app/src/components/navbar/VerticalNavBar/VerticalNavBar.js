import React from "react";
import { NavLink } from "react-router-dom";
import "./VerticalNavBar.css";
import { FiEdit, FiHome } from "react-icons/fi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import ProfileButton from "../ProfileButton";

const VerticalNavBar = ({ user }) => {
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
              <FiHome className="navbaricon" />
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/profiles/${user.id}`}
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <BsJournalBookmarkFill className="navbaricon" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-story" exact={true} activeClassName="active" style={{ textDecoration: "none" }}>
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
