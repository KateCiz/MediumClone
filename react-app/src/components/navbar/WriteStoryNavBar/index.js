import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./index.css";
import ProfileButton from "./ProfileButton"
import {SiMedium} from "react-icons/si"
import ConfirmModal from "../../writepage/ConfirmModal/index";



const WriteStoryNavBar = ({user, publish, filledState, update}) => {

  const history= useHistory()
  const handleCancel = () => {
    history.push("/")
  }

  return (
    <nav className="write-story-navbar-container">
      <div className="header-left-side">
        <NavLink to="/" className="site-logo">
          {/* <img className="medium-logo-main" src={"../MediumLogo.ico"} alt="" /> */}
          <SiMedium className="medium-logo-write" />
        </NavLink>
        <span className="name-header">
          Draft in {user?.first_name} {user?.last_name}
        </span>
      </div>

      <ul>
        {update === true ? (
          <li>
            <button onClick={handleCancel} className="cancel-btn-updatepage">Cancel</button>
          </li>
        ) : null}
        <li>
          <ConfirmModal
            filledState={filledState}
            publish={publish}
            update={update}
          />
        </li>
        <li>
          <ProfileButton user={user} />
        </li>
      </ul>
    </nav>
  );
};

export default WriteStoryNavBar;
