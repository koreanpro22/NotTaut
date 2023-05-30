import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";
import { getAllMessagesThunk } from "../../store/message";

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
        <div>
            <h1>Delete Message</h1>
            <button onClick={(e) => {
                closeModal()
                deleteChat(e, messageId)
            }}>Confirm</button>
            <button onClick={(e) => {
                closeModal()
            }}>Cancel</button>
        </div>
    );
}

export default DeleteMessageModal;
