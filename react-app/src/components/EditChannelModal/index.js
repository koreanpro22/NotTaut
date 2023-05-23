import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleChannelThunk, updateSingleChannelThunk } from "../../store/channel";
import { getSingleWorkspaceThunk } from "../../store/workspace";

function EditChannelModal({name, topic, description, workspaceId, channelId }) {
	console.log('hitting edit channel modal')
	const dispatch = useDispatch();
	const [channelName, setChannelName] = useState(name || "");
	const [channelTopic, setChannelTopic] = useState(topic || "");
	const [channelDescription, setChannelDescription] = useState(description || "");
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
			await dispatch(updateSingleChannelThunk(newChannel, channelId));
			await dispatch(getSingleWorkspaceThunk(workspaceId))
			await dispatch(getSingleChannelThunk(channelId))
			closeModal();

		}
	};

	return (
		<div>
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
