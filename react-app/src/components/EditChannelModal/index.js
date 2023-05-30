import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleChannelThunk, updateSingleChannelThunk } from "../../store/channel";
import { getSingleWorkspaceThunk } from "../../store/workspace";
import { authenticate } from "../../store/session";
import './EditChannelModal.css';

function EditChannelModal({ channel }) {
	console.log('hitting edit channel modal')
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
			// await dispatch(getSingleChannelThunk(channel.id))
			await dispatch(authenticate())
			await dispatch(getSingleWorkspaceThunk(channel.workspace.id))

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
						onChange={(e) => setChannelName(e.target.value)}
						required
					/>
				</label>
				<label>
					Topic
					<input
						type="text"
						value={channelTopic}
						onChange={(e) => setChannelTopic(e.target.value)}
					/>
				</label>
				<label>
					Description
					<input
						type="text"
						value={channelDescription}
						onChange={(e) => setChannelDescription(e.target.value)}
					/>
				</label>
				<button type="submit">Edit Channel</button>
			</form>
		</div>
	);
}

export default EditChannelModal;
