import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";
import "./VerticalNavBar.css";
import { FiEdit, FiBookmark, FiHome } from "react-icons/fi";

const VerticalNavBar = () => {
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
        <button className="profile-btn">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
            className="user-pic"
          ></img>
        </button>
      </nav>
    </div>
  );
};

export default VerticalNavBar;
