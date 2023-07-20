import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChannelsThunk, setCurrentChannelThunk } from '../../store/channel';
import './SingleChannel.css'
import { createSingleMessageThunk, deleteSingleMessageThunk, getAllChannelMessagesThunk, updateSingleMessageThunk } from '../../store/message';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import { io } from 'socket.io-client';
import MessageModal from '../MessageModal';
import '../MessageModal/MessageModal.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import DeleteMessageModal from '../DeleteMessageModal';
import { useModal } from '../../context/Modal';

let socket;

function SingleChannel({ channels }) {
    const { workspaceId } = useParams();
    const dispatch = useDispatch()
    const allChannels = useSelector(state => state.channel.allChannels)
    const currentChannelId = useSelector(state => state.channel.currentChannel)
    const sessionUser = useSelector(state => state.session.user)
    const allMessagesObj = useSelector(state => state.message.messages)
    const allMessages = Object.values(allMessagesObj)
    const messages = allMessages.filter(message => message.channel_id === +currentChannelId)
    const [message, setMessage] = useState('')
    const [showChannelOption, setShowChannelOption] = useState(false);
    const [editMessageId, setEditMessageId] = useState();
    const [editMessage, setEditMessage] = useState();
    const { setModalContent } = useModal();

    // const timestamp = Date.now()
    // const todayDate = new Date(timestamp)

    useEffect(() => {
        dispatch(getAllChannelsThunk(workspaceId))
        dispatch(getAllChannelMessagesThunk(messages, currentChannelId))
    }, [dispatch, currentChannelId])

    useEffect(() => {
        socket = io();
        socket.on('chat', (chat) => {
            if (chat.message_id) {
                if (Object.values(chat).length > 1) {
                    dispatch(updateSingleMessageThunk(chat))
                } else {
                    dispatch(deleteSingleMessageThunk(chat.message_id))
                }
            } else {
                dispatch(createSingleMessageThunk(chat))
            }
        })
        return (() => {
            socket.disconnect()
        })
    }, [io])

    const sendChat = async (e) => {
        e.preventDefault()
        if (message.length > 0 && message[0] !== ' ') {
            await socket.emit('chat', { user: sessionUser.name, text: message, user_id: sessionUser.id, channel_id: channel.id })
            dispatch(getAllChannelMessagesThunk(messages, currentChannelId))
            setMessage('')
        }
    }

    const updateChat = async (e, messageId) => {
		e.preventDefault()
        if(!editMessage.length) {
            setModalContent(<DeleteMessageModal
                        messageId={messageId}
                        socket={socket} />)
        } else {
            setEditMessageId('');
            await socket.emit('chat', { 'text' : editMessage, 'message_id' : messageId })
        }
	}
    console.log('here ', channels)
    if (!channels && !currentChannelId) return null
    if (!(channels.find(channel => channel.id === currentChannelId))) {
        dispatch(setCurrentChannelThunk(channels[0].id))
    }

    const channel = allChannels[currentChannelId]

    const formatCreatedAtDate = (dateStr) => {
        const hms = dateStr.split(' ')[1].split(':')
        const currentHms = +hms[0] - 4

        return currentHms < 0 ? `${currentHms + 12}:${hms[1]} pm` : currentHms < 12 ? `${currentHms}:${hms[1]} am` : `${currentHms - 11}:${hms[1]} pm`
    }

    const handleShowChannelOption = () => {
        setShowChannelOption(!showChannelOption)
    }

    const closeEditMessage = () => {
        setEditMessage('')
        setEditMessageId('')
    }

    // const hideChannelOption = showChannelOption ? '' : 'hide'

    return (
        <div className='single-channel-container'>
            <div className='single-channel-header'>
                <div onClick={handleShowChannelOption} style={{ cursor: 'pointer' }}>
                    <strong>Channel Name: {channel.name} </strong>
                    {showChannelOption ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-right" ></i>}
                </div>
                {sessionUser.id === channel.workspace.owner_id && showChannelOption && <div className='channel-edit-delete'>
                    <OpenModalButton
                        onModalClose={handleShowChannelOption}
                        buttonText='Edit Channel'
                        className='edit-channel-button'
                        modalComponent={<EditChannelModal channel={channel} />}
                    />
                    {channel.id !== channels[0].id && <OpenModalButton
                        onModalClose={handleShowChannelOption}
                        buttonText='Delete Channel'
                        className='delete-channel-button'
                        modalComponent={<DeleteChannelModal channel={channel} />}
                    />}
                </div>}
                <div>{Object.keys(channel['channel_users']).length} members </div>
            </div>
            <div className='message-container'>
                <div className='all-messages-container'>
                    {messages.toReversed().map(message => {
                        return <div className='single-message'>
                            <div className='single-message-detail'>
                                <div className='edit-message-top'>
                                <div>{message.user.name} {formatCreatedAtDate(message.created_at)}</div>
                                {editMessageId === message.id && <i class="fas fa-times" onClick={closeEditMessage}></i>}
                                </div>
                                {+editMessageId === message.id ?
                                	<div className="edit-message-modal">
                                        <form onSubmit={(e) => updateChat(e, message.id)}>
                                            <label>
                                                <textarea
                                                    className='edit-message-area'
                                                    type="text"
                                                    value={editMessage}
                                                    maxLength={1000}
                                                    onChange={(e) => setEditMessage(e.target.value)}
                                                    required
                                                />
                                            </label>
                                        </form>
                                        <button onClick={(e) => updateChat(e, message.id)}>Edit Message</button>
                                    </div>
                                : <p>{message.text}</p>}
                            </div>
                            <div className='message-modal'>
                                <MessageModal user={sessionUser} channel={channel} message={message} socket={socket} setEditMessage={setEditMessage} setEditMessageId={setEditMessageId}/>
                            </div>
                        </div>
                    })}
                </div >
                <div className='create-message-container'>
                    <form onSubmit={sendChat} className='create-message-form'>
                        <textarea
                            className='create-message-area'
                            placeholder={'Message #' + channel.name}
                            type="text"
                            value={message}
                            maxLength={1000}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        <div>
                            {message.length + ' /1000 '}
                            <button type="submit" className='create-message-button'> Send Message <i className="fas fa-location-arrow send-arrow"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default SingleChannel;
