import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './EditMessageModal.css';

function EditMessageModal({ message, messageId, channelId, socket }) {

	const dispatch = useDispatch();
	const [newMessage, setNewMessage] = useState(message);
	const { closeModal } = useModal();
	const updateChat = async (e) => {
		closeModal();
		e.preventDefault()
		await socket.emit('chat', { 'text' : newMessage, 'message_id' : messageId })
	}

	return (
		<div className="edit-message-modal">
			<h1>Edit Message</h1>
			<form onSubmit={(e) => updateChat(e)}>
				<label>
					<input
						type="text"
						value={newMessage}
						maxLength={1000}
						onChange={(e) => setNewMessage(e.target.value)}
						required
					/>
				</label>
			</form>
			<button type='submit'>Edit Message</button>
		</div>
	);
}

export default EditMessageModal;
