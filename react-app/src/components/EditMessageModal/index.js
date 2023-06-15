import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";
import { updateSingleMessageThunk } from "../../store/message";
import './EditMessageModal.css';

let socket;

function EditMessageModal({ message, messageId }) {

	const dispatch = useDispatch();
	const [newMessage, setNewMessage] = useState(message);
	const { closeModal } = useModal();
	socket = io();
	const updateChat = async (e) => {
		console.log('hitting edit')
		closeModal();
		e.preventDefault()
		await socket.emit('chat', { 'text' : newMessage, 'message_id' : messageId })
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
