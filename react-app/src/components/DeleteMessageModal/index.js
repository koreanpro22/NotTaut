import React from "react";
import { useModal } from "../../context/Modal";
import './DeleteMessageModal.css';
import { useDispatch } from "react-redux";

function DeleteMessageModal({ messageId, channelId, socket }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

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
