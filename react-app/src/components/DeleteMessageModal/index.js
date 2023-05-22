import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSingleMessageThunk } from "../../store/message";
import { getSingleChannelThunk } from "../../store/channel";

function DeleteMessageModal({ channelId, messageId }) {
    console.log('hitting delete channel modal')

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteSingleMessageThunk(messageId))
        dispatch(getSingleChannelThunk(channelId))
        closeModal();
    }

    return (
        <div>
            <h1>Delete Message</h1>
            <div onClick={handleDelete}>Confirm</div>
            <div onClick={() => closeModal()}>Cancel</div>
        </div>
    );
}

export default DeleteMessageModal;
