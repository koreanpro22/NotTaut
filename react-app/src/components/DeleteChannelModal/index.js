import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSingleChannelThunk } from "../../store/channel";
import { getSingleWorkspaceThunk } from "../../store/workspace";

function DeleteChannelModal({ workspaceId, channelId }) {
    console.log('hitting delete channel modal')

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSingleChannelThunk(channelId));
        await dispatch(getSingleWorkspaceThunk(workspaceId))
        closeModal();

    }

    return (
        <div>
            {console.log('hitting return')}
            <h1>Delete Channel</h1>
            <div onClick={handleDelete}>Confirm</div>
            <div onClick={() => closeModal()}>Cancel</div>
        </div>
    );
}

export default DeleteChannelModal;