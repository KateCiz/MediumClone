import { useDispatch } from "react-redux";
import {login} from "../../../store/session";
import "./index.css";

const DemoAccount = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
  };

  return (
    <button className="demo-login" onClick={(e) => handleClick(e)}>
      Demo user
    </button>
  );
};

export default DemoAccount;
