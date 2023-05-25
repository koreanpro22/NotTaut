import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSingleMessageThunk } from "../../store/message";
import { getSingleChannelThunk } from "../../store/channel";
import { io } from "socket.io-client";
import { getAllMessagesThunk } from "../../store/message";

let socket;

function DeleteMessageModal({ channelId, messageId }) {
    console.log('hitting delete channel modal')

    socket = io();

    const dispatch = useDispatch();
    const { closeModal } = useModal();



    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     dispatch(deleteSingleMessageThunk(messageId))
    // }

    return (
        <div>
            <h1>Delete Message</h1>
            <div>Confirm</div>
            <div onClick={() => closeModal()}>Cancel</div>
        </div>
    );
}

export default DeleteMessageModal;
