import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSingleChannelThunk } from "../../store/channel";
import { useHistory } from "react-router-dom";
import './DeleteChannelModal.css';
import { deleteChannelMessagesAction } from "../../store/message";

function DeleteChannelModal({ channel }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const allChannels = useSelector(state => state.channel.allChannels)
    const allMessagesObj = useSelector(state => state.message.messages)
    const allMessages = Object.values(allMessagesObj)
    const messageIds = allMessages.filter(x => x.channel_id === channel.id).map(m => m.id)

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteChannelMessagesAction(messageIds))
        await dispatch(deleteSingleChannelThunk(channel.id));
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
