import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getAllChannelMessagesThunk, updateSingleMessageThunk } from "../../store/message";
import './EditMessageModal.css';

function EditMessageModal({ message, messageId, channelId, socket }) {

	const dispatch = useDispatch();
	const [newMessage, setNewMessage] = useState(message);
	const { closeModal } = useModal();
	const updateChat = async (e) => {
		console.log('hitting edit')
		closeModal();
		e.preventDefault()
		await socket.emit('chat', { 'text' : newMessage, 'message_id' : messageId })
        // dispatch(getAllChannelMessagesThunk(channelId))
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (newMessage) {
			const message = {
				text: newMessage
			}
            dispatch(updateSingleMessageThunk(message, messageId))
			closeModal();
		}
	};

	return (
		<div className="edit-message-modal">
			<h1>Edit Message</h1>
			<form>
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
			<button onClick={(e) => updateChat(e)}>Edit Message</button>
		</div>
	);
}

export default EditMessageModal;
