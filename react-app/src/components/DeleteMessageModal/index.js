import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";
import { getAllMessagesThunk } from "../../store/message";
import './DeleteMessageModal.css';

let socket;

function DeleteMessageModal({ messageId, channelId }) {
    console.log('hitting delete channel modal')

    socket = io();

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteChat = async (e, messageId) => {
        e.preventDefault()
        await socket.emit('chat', { 'message_id': messageId })
        dispatch(getAllMessagesThunk(channelId))

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
