import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateSingleChannelThunk } from "../../store/channel";
import './EditChannelModal.css';

function EditChannelModal({ channel }) {
	const dispatch = useDispatch();
	const [channelName, setChannelName] = useState(channel.name || "");
	const [channelTopic, setChannelTopic] = useState(channel.topic || "");
	const [channelDescription, setChannelDescription] = useState(channel.description || "");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (channelName) {
			const newChannel = {
				name: channelName,
				topic: channelTopic,
				description: channelDescription
			}
			await dispatch(updateSingleChannelThunk(newChannel, channel.id));
			closeModal();
		}
	};

	return (
		<div className="edit-channel-modal">
			<h1>Edit Channel</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name
					<input
						type="text"
						value={channelName}
						maxLength={40}
						onChange={(e) => setChannelName(e.target.value)}
						required
					/>
				</label>
				<label>
					Topic
					<input
						type="text"
						value={channelTopic}
						maxLength={40}
						onChange={(e) => setChannelTopic(e.target.value)}
						/>
				</label>
				<label>
					Description
					<input
						type="text"
						value={channelDescription}
						maxLength={100}
						onChange={(e) => setChannelDescription(e.target.value)}
					/>
				</label>
				<button type="submit">Edit Channel</button>
			</form>
		</div>
	);
}

export default EditChannelModal;
