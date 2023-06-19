import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormModal() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validateErrors = []

		if (!email.includes('@')) {
			validateErrors.push('Email must be a valid email!')
		}

		if (name.length > 40) {
			validateErrors.push('Name must be max of 40 characters!')
		}


		if (validateErrors.length) {
			setErrors(validateErrors)
			return
		}

		if (password === confirmPassword) {
			const data = await dispatch(signUp(name, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/')
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-modal-container">
			<div className="signup-modal-header">Sign Up</div>
			<form onSubmit={handleSubmit} className="signup-form-container">
				<div>
					{errors.map((error, idx) => (
						<div className='error-message' key={idx}>{error}</div>
					))}
				</div>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" className="signup-button">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
