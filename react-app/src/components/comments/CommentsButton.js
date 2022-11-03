import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import CommentsBar from "./CommentsBar";

import './CommentsButton.css';

function CommentsButton({id, type}) {
  const [display1, setDisplay1] = useState(false);

  return (
    <>
      <i className="fa-solid fa-comment fa-lg" onClick={() => setDisplay1(!display1)}></i>
      {display1 && <CommentsBar id={id} type={type || 'story'} setDisplay={setDisplay1} />}
    </>
  );
}

export default CommentsButton
