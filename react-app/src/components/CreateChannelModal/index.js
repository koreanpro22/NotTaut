import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createSingleChannelThunk, setCurrentChannelThunk } from "../../store/channel";
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
			const res = await dispatch(createSingleChannelThunk(newChannel, workspaceId));
			dispatch(setCurrentChannelThunk(res.id))
			closeModal();
		}
	};

	return (
		<div className="create-channel-modal">
			<h1> Create new Channel</h1>
			<form onSubmit={handleSubmit} className="create-channel-form">
				<label>
					Name <input
						type="text"
						value={channelName}
						maxLength={40}
						onChange={(e) => setChannelName(e.target.value)}
						required
					/> {channelName.length}/40
				</label>
				<button type="submit">Create Channel</button>
			</form>
		</div>
	);
}

export default CreateChannelModal;
