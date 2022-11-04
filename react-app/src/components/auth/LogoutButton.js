import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./LogoutButton.css";
import {useHistory} from "react-router-dom"

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button onClick={onLogout} className="global-logout-btn">Logout</button>;
};

export default LogoutButton;
