import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoButton = async (e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io'
    const demoPassword = 'password'

    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const handleDemoButton2 = async (e) => {
    e.preventDefault();
    const demoEmail = 'test1@aa.io'
    const demoPassword = 'password'

    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  return (
    <div className="login-modal-container">
      <div className="login-modal-header">Log In</div>
      {errors.length > 0 &&
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      }
      <form onSubmit={handleSubmit} className="login-form-container">

        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-button">Log In</button>
      </form>
      <button onClick={handleDemoButton}>Demo User</button>
      <button onClick={handleDemoButton2}>Demo User 2</button>
    </div>
  );
}

export default LoginFormModal;
