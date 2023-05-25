import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSingleChannelThunk } from "../../store/channel";
import { getSingleWorkspaceThunk } from "../../store/workspace";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";

function DeleteChannelModal({ channel, setCurrentChannelId }) {
    console.log('hitting delete channel modal')

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSingleChannelThunk(channel.id));
        await dispatch(authenticate())
        await dispatch(getSingleWorkspaceThunk(channel.workspace.id))
        history.push(`/workspace/${channel.workspace.id}`);
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
