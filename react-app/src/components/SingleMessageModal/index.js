import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import EditMessageModal from "../EditMessageModal";
import './SingleMessageModal.css'

function MessageModal({ user, channel, message, deleteChat }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showOptions, setShowOptions] = useState(false);
    const ulRef = useRef();

    const openOptions = () => {
        if (showOptions) return;
        setShowOptions(true);
    };

    useEffect(() => {
        if (!showOptions) return;

        document.addEventListener("click", closeOptions);

        return () => document.removeEventListener("click", closeOptions);
    }, [showOptions]);

    const showEditDelete = 'message-edit-delete' + (showOptions ? '' : ' hidden');
    const closeOptions = () => setShowOptions(false);

    return (
        <div className="edit-delete-container">
            <div onClick={openOptions} >
                <i class="fas fa-bars"></i>
            </div>
            {showOptions && <div className={showEditDelete}>
                {(message.user_id === user.id) &&
                    <OpenModalButton
                        buttonText='Edit'
                        onItemClick={closeOptions}
                        modalComponent={<EditMessageModal
                            message={message.text}
                            channelId={message.channel_id}
                            messageId={message.id} />}
                    />
                }
                {user.id === channel.workspace.owner_id && <button onClick={(e) => {
                    closeOptions()
                    deleteChat(e, message.id)
                }
                }>Delete</button>
                }
            </div>}
        </div>

    );
}

export default MessageModal;
