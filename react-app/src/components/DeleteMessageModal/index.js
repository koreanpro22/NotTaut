import React from "react";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";
import './DeleteMessageModal.css';

let socket;

function DeleteMessageModal({ messageId }) {

    socket = io();
    const { closeModal } = useModal();

    const deleteChat = async (e, messageId) => {
        e.preventDefault()
        await socket.emit('chat', { 'message_id': messageId })
    }

    return (
        <div className="delete-message-modal">
            <h1>Delete Message</h1>
            <div className="confirm-delete">
                <div onClick={(e) => {
                    closeModal()
                    deleteChat(e, messageId)
                }}>Confirm</div>
                <div onClick={(e) => {
                    closeModal()
                }}>Cancel</div>
            </div>
        </div>
    );
}

export default DeleteMessageModal;
