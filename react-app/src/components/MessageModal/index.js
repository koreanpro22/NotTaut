import React, { useState, useEffect } from "react";
import OpenModalButton from "../OpenModalButton";
import EditMessageModal from "../EditMessageModal";
import './MessageModal.css'
import DeleteMessageModal from "../DeleteMessageModal";

function MessageModal({ user, channel, message, deleteChat }) {

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
            <div onClick={openOptions} className="triple-bar">
                <i class="fas fa-bars"></i>
            </div>
            {showOptions && <div className={messageOption}>
                {(message.user.id === user.id) &&
                    <OpenModalButton
                        buttonText='Edit'
                        onItemClick={closeOptions}
                        modalComponent={<EditMessageModal
                            message={message.text}
                            channelId={message.channel_id}
                            messageId={message.id} />}
                    />
                }
                {user.id === channel.workspace.owner_id &&
                    <OpenModalButton
                        buttonText='Delete'
                        onItemClick={closeOptions}
                        modalComponent={<DeleteMessageModal
                            messageId={message.id}
                            channelId={message.channel_id}
                            deleteChat={deleteChat}
                        />}
                    />
                }
            </div>}
        </div>

    );
}

export default MessageModal;
