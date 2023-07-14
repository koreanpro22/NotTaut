import React, { useState, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import './MessageModal.css'
import DeleteMessageModal from "../DeleteMessageModal";

function MessageModal({ user, channel, message, socket, setEditMessage, setEditMessageId }) {

    const [showOptions, setShowOptions] = useState(false);
    const openOptions = () => {
        if (showOptions) return;
        setShowOptions(true);
    };

    useEffect(() => {
        if (!showOptions) return;
        document.addEventListener("click", closeOptions);
        return () => document.removeEventListener("click", closeOptions);
    }, [showOptions]);

    const messageOption = 'message-edit-delete' + (showOptions ? '' : ' hidden');
    const closeOptions = () => setShowOptions(false);

    return (
        <div className="edit-delete-container">
            {(user.id === channel.workspace.owner_id || user.id === message.user.id) &&
                <div onClick={openOptions} className="triple-bar">
                    <i className="fas fa-bars"></i>
                </div>}
            {showOptions ? <div className={messageOption}>
                {(message.user.id === user.id) &&
                    <button onClick={() => {
                        setEditMessageId(message.id)
                        setEditMessage(message.text)
                    }}>Edit</button>
                }
                {<OpenModalButton
                    buttonText='Delete'
                    onItemClick={closeOptions}
                    modalComponent={<DeleteMessageModal
                        messageId={message.id}
                        channelId={message.channel_id}
                        socket={socket}
                    />}
                />
                }
            </div> : null}
        </div>

    );
}

export default MessageModal;
