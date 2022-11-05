import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import LoginPopUpModal from "../auth/LoginPopUp";
import CommentsBar from "./CommentsBar";

import './CommentsButton.css';

function CommentsButton({id, type}) {
  const [display1, setDisplay1] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  let Comment;

  // if(display1 && sessionUser){
  //   Comment = <i className="fa-solid fa-comment fa-lg" onClick={() => setDisplay1(!display1)}></i>;
  // } if(!display1 && sessionUser){
  //   Comment = <i className="fa-regular fa-comment fa-lg" onClick={() => setDisplay1(!display1)}></i>;
  // } if(!sessionUser){
  //   Comment = <LoginPopUpModal location='comment' />;
  // }

  return (
    <>
      {display1 ? <i className="fa-solid fa-comment fa-lg" onClick={() => setDisplay1(!display1)}></i>:
      <i className="fa-regular fa-comment fa-lg" onClick={() => setDisplay1(!display1)}></i>}
      { Comment }

      {display1 && <CommentsBar id={id} type={type || 'story'} setDisplay={setDisplay1} />}
    </>
  );
}

export default CommentsButton
