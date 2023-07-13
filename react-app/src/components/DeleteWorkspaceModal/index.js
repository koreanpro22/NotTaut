import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './DeleteWorkspaceModal.css';
import { deleteSingleWorkspaceThunk } from "../../store/workspace";

function DeleteWorkspaceModal({ workspaceId }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteSingleWorkspaceThunk(workspaceId))
        history.push('/')
        closeModal();
    }

    return (
        <div className="delete-workspace-modal">
            <h1>Delete Workspace</h1>
            <div className="confirm-delete">
                <div onClick={handleDelete}>Confirm</div>
                <div onClick={() => closeModal()}>Cancel</div>
            </div>
        </div>
    );
}

export default DeleteWorkspaceModal;
