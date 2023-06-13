import React, { useState, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSingleChannelThunk } from "../../store/channel";
import { getSingleWorkspaceThunk } from "../../store/workspace";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../store/session";
import './DeleteChannelModal.css';

function DeleteChannelModal({ channel, setCurrentChannelId }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        setCurrentChannelId('');
        await dispatch(deleteSingleChannelThunk(channel.id));
        await dispatch(authenticate())
        await dispatch(getSingleWorkspaceThunk(channel.workspace.id))
        history.push(`/workspace/${channel.workspace.id}`);
        closeModal();
    }

    return (
        <div className="delete-channel-modal">
            <h1>Delete Channel</h1>
            <div className="confirm-delete">
                <div onClick={handleDelete}>Confirm</div>
                <div onClick={() => closeModal()}>Cancel</div>
            </div>
        </div>
    );
}

export default DeleteChannelModal;
