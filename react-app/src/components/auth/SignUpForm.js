import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({closeModal, switchPage}) => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(first_name, last_name, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const exitFromModal = (e) => {
    closeModal();
  }

  const switchToLogin = (e) => {
    switchPage();
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-container">
      <button className="exit-icon" onClick={exitFromModal}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="signup-modal-heading">Join Medium.</span>
      <form className="signup-form" onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className="signup-label">Your email</label>
          <input
            className="signup-input"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label className="signup-label">First name</label>
          <input
            className="signup-input"
            type="text"
            name="first_name"
            onChange={updateFirstName}
            value={first_name}
          ></input>
        </div>
        <div>
          <label className="signup-label">Last name</label>
          <input
            className="signup-input"
            type="text"
            name="last_name"
            onChange={updateLastName}
            value={last_name}
          ></input>
        </div>
        <div>
          <label className="signup-label">Password</label>
          <input
            className="signup-input"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label className="signup-label">Confirm password</label>
          <input
            className="signup-input"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type="submit" className="signup-btn-modal">
          Sign Up
        </button>
      </form>

      <div className='switch-to-login'>
        <span>Already have an account ?<button className="switch-to-signin-btn" onClick={switchToLogin}>Sign in</button></span>
      </div>
    </div>
  );
};

export default SignUpForm;
