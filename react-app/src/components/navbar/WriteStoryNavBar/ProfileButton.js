import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import "./ProfileButton.css";
import LogoutButton from "../../auth/LogoutButton";

function ProfileButton({ user }) {
  // const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  let profilePic;

  if(!user?.image_profile_url){
    profilePic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6sGddmMZFZCqb7aJFx5eV-8FGj2gJWz7abGntj8IuyYdAv7W2HEJyi5WY3xbpLLzf-Zg&usqp=CAU";
  } else {
    profilePic = user?.image_profile_url;
  }

  return (
    <div className="horizontal-flyout-container">
      <button className="horizontal-flyout" onClick={openMenu}>
        <div
          style={{ backgroundImage: `url('${profilePic}')` }}
          alt="" className="horizontal-user-pic"
        ></div>
      </button>
      {showMenu && (
        <ul className="horizontal-profile-dropdown">
          <li>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </li>
          <li>
            <span>{user.email}</span>
          </li>
          <li className="logout-btn-horizontal">
            <LogoutButton />
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
