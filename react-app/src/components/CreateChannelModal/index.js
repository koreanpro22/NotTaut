import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSingleChannelThunk } from "../../store/channel";
import './CreateChannelModal.css';

function CreateChannelModal({ workspaceId }) {
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
			dispatch(createSingleChannelThunk(newChannel, workspaceId));
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
