import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSingleChannelThunk } from "../../store/channel";
import { updateSingleMessageThunk } from "../../store/message";

function EditMessageModal({ message, channelId, messageId }) {
	const dispatch = useDispatch();
	const [newMessage, setNewMessage] = useState(message);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newMessage) {
			const message = {
				text: newMessage
			}
            dispatch(updateSingleMessageThunk(message, messageId))
            dispatch(getSingleChannelThunk(channelId))
			closeModal();

		}
	};

	return (
		<div>
			<h1>Edit Message</h1>
			<form onSubmit={handleSubmit}>
				<label>
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Edit Message</button>
			</form>
		</div>
	);
}

export default EditMessageModal;
