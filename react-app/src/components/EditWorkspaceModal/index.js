import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './EditWorkspaceModal.css';
import { updateSingleWorkspaceThunk } from "../../store/workspace";

function EditWorkspaceModal({ workspace }) {
    const dispatch = useDispatch();
    const [workspaceName, setWorkspaceName] = useState(workspace.name || "");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (workspaceName.length) {
            await dispatch(updateSingleWorkspaceThunk(workspaceName, workspace.id))
            closeModal();
        }
    };

    return (
        <div className="edit-workspace-modal">
            <h1>Edit Workspace</h1>
            <form onSubmit={handleSubmit} className="edit-workspace-form">
                <label>
                    Name
                    <input
                        type="text"
                        value={workspaceName}
                        maxLength={40}
                        onChange={(e) => setWorkspaceName(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Edit Workspace</button>
            </form>
        </div>
    );
}

export default EditWorkspaceModal;
