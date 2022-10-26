import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";
import "./VerticalNavBar.css";

const VerticalNavBar = () => {
  return (
    <div className="SideBar">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <i className="fa-brands fa-medium navbaricon"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <i className="fa-solid fa-house navbaricon"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <i className="fa-solid fa-book-open navbaricon"></i>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              style={{ textDecoration: "none" }}
            >
              <i className="fa-regular fa-pen-to-square navbaricon"></i>
            </NavLink>
          </li>
        </ul>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU"
          className="user-pic"
        ></img>
      </nav>
    </div>
  );
};

export default VerticalNavBar;
