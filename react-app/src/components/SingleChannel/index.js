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

let socket;

function SingleChannel({ channels, channelId }) {
    const { workspaceId } = useParams();
    const dispatch = useDispatch()
    const allChannels = useSelector(state => state.channel.allChannels)
    const currentChannelId = useSelector(state => state.channel.currentChannel)
    const sessionUser = useSelector(state => state.session.user)
    const allMessagesObj = useSelector(state => state.message.messages)
    const allMessages = Object.values(allMessagesObj)
    const messages = allMessages.filter(message => message.channel_id === +channelId)
    console.log("🚀 ~ file: index.js:25 ~ SingleChannel ~ messages:", messages)
    const [message, setMessage] = useState('')
    // const timestamp = Date.now()
    // const todayDate = new Date(timestamp)
    // const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        dispatch(getAllChannelsThunk(workspaceId))
        dispatch(getAllChannelMessagesThunk(messages, channelId))
    }, [dispatch, channelId])

    useEffect(() => {
        socket = io();
        socket.on('chat', (chat) => {
            console.log('Inside Socket chat', chat)
            if (chat.message_id) {
                if (Object.values(chat).length > 1) {
                    dispatch(updateSingleMessageThunk(chat))
                } else {
                    dispatch(deleteSingleMessageThunk(chat.message_id))
                }
            } else {
                console.log('channel id', currentChannelId)
                console.log("🚀 ~ file: index.js:49 ~ socket.on ~ chat:", chat)
                dispatch(createSingleMessageThunk(chat))
            }
            dispatch(getAllChannelMessagesThunk(messages, currentChannelId))
        })
        return (() => {
            socket.disconnect()
        })
    }, [io])

    const sendChat = async (e) => {
        e.preventDefault()
        await socket.emit('chat', { user: sessionUser.name, text: message, user_id: sessionUser.id, channel_id: channel.id })
        dispatch(getAllChannelMessagesThunk(messages, currentChannelId))
        setMessage('')
    }

    if (!channelId) return null
    if (!channels.find(channel => channel.id === channelId)) {
        dispatch(setCurrentChannelThunk(channels[0].id))
    }

    const channel = allChannels[channelId]

    return (
        <div className='single-channel-container'>
            <div className='single-channel-header'>
                <div>
                    <strong>Channel Name: {channel.name} </strong>
                    <i className="fas fa-chevron-down"></i>
                    {sessionUser.id === channel.workspace.owner_id && <div>
                        <OpenModalButton
                            buttonText='Edit'
                            modalComponent={<EditChannelModal channel={channel} />}
                        />
                        {channel.id !== channels[0].id && <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteChannelModal channel={channel} />}
                            />
                        }
                    </div>}
                </div>
                <div>
                    {channel.channel_users.length} members
                </div>
            </div>
            <div className='message-container'>
                <div className='all-messages-container'>
                    {messages.toReversed().map(message => {
                        return <>
                            <div className='single-message'>
                                <div className='single-message-detail'>
                                    <div>
                                        {message.user.name} {message.created_at.split(' ')[1]}
                                    </div>
                                    <div>
                                        {message.text}
                                    </div>
                                </div>
                                <div className='message-modal'>
                                    <MessageModal user={sessionUser} channel={channel} message={message} socket={socket}/>
                                </div>
                            </div>
                        </>
                    })}
                </div >
                <div className='create-message-container'>
                    <form onSubmit={sendChat}>
                        <label>
                            <textarea
                                className='create-message-area'
                                // rows='4'
                                placeholder={'Message #' + channel.name}
                                type="text"
                                value={message}
                                maxLength={1000}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" className='create-message-button'>Send Message</button>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default SingleChannel;
