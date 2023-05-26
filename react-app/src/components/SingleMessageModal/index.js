import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import EditMessageModal from "../EditMessageModal";

function MessageModal({ user, channel, message, deleteChat }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = (e) => {
    //         if (!ulRef.current.contains(e.target)) {
    //             setShowMenu(false);
    //         }
    //     };

    //     document.addEventListener("click", closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // }, [showMenu]);

    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     setShowMenu(false);
    //     dispatch(logout());
    //     history.push('/')
    // };

    // const dropdown = "profile-dropdown" + (showMenu ? "" : " hidden");
    // const closeMenu = () => setShowMenu(false);


    console.log(channel)
    return (
        <div>
            {(user.id === channel.workspace.owner_id || message.user_id === user.id) &&
                <div className='message-edit-delete'>
                    <OpenModalButton
                        buttonText='Edit'
                        modalComponent={<EditMessageModal message={message.text} channelId={message.channel_id} messageId={message.id} />}
                    />
                    <button onClick={(e) => deleteChat(e, message.id)}>Delete Message</button>
                </div>
            }

        </div>

    );
}

export default MessageModal;
