import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSingleChannelThunk } from "../../store/channel";
import { authenticate } from "../../store/session";
import './CreateChannelModal.css';

function CreateChannelModal({ setCurrentChannelId, workspaceId }) {
	console.log('hitting create channel modal')
	const dispatch = useDispatch();
	const [channelName, setChannelName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (channelName) {
			const newChannel = {
				name: channelName
			}
			const res = await dispatch(createSingleChannelThunk(newChannel, workspaceId));
			setCurrentChannelId(res.id)
			await dispatch(authenticate())
			closeModal();
		}
	};

	return (
		<div className="create-channel-modal">
			<h1>Create new Channel</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name
					<input
						type="text"
						value={channelName}
						onChange={(e) => setChannelName(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Create Channel</button>
			</form>
		</div>
	);
}

export default CreateChannelModal;
