import React, { useState, useEffect} from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import "./index.css"
import { useHistory } from "react-router-dom";
import {deleteAStory} from "../../../store/stories"
import { useDispatch } from "react-redux";



const Ellipse = ({ story }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleEdit = async () => {
    history.push("/edit-story/" + story.id)
  };

  const handleDelete = () => {
    dispatch(deleteAStory(story.id))
    history.push("/")
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="ellipse-container">
      <AiOutlineEllipsis className="edit-ellipse" onClick={openMenu}/>
      {showMenu && (
        <ul className="ellipse-dropdown">
            <li>
                <button className="edit-story-btn" onClick={handleEdit}>edit</button>
            </li>
            <li>
                <button className="delete-story-btn" onClick={handleDelete}>delete</button>
            </li>
        </ul>
      )}
    </div>
  );
};


export default Ellipse;
