import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChannelsThunk } from '../../store/channel';
import './SingleChannel.css'
import { deleteSingleMessageThunk, getAllChannelMessagesThunk, updateSingleMessageThunk } from '../../store/message';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import { useChannelIdUpdate } from '../../context/ChannelIdProvider';
import { io } from 'socket.io-client';
import MessageModal from '../MessageModal';
import '../MessageModal/MessageModal.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

let socket;

function SingleChannel({ channels, channelId }) {
    const { workspaceId } = useParams();
    const allChannels = useSelector(state => state.channel.allChannels)
    const channel = allChannels[channelId]
    const sessionUser = useSelector(state => state.session.user)
    const allMessagesObj = useSelector(state => state.message.messages)
    // console.log("🚀 ~ file: index.js:23 ~ SingleChannel ~ allMessagesObj:", allMessagesObj)
    const allMessages = Object.values(allMessagesObj)
    // console.log("🚀 ~ file: index.js:25 ~ SingleChannel ~ allMessages:", allMessages)
    const workspace = useSelector(state => state.workspace.currentWorkspace)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const setCurrentChannelId = useChannelIdUpdate()
    const timestamp = Date.now()
    const todayDate = new Date(timestamp)
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        console.log('hitting off channel Id')
        dispatch(getAllChannelsThunk(workspaceId))
        dispatch(getAllChannelMessagesThunk(channelId))
    }, [channelId])

    useEffect(() => {
        console.log('hitting off socket')
        socket = io();

        socket.on('chat', (chat) => {
            if (chat.message_id) {
                console.log("🚀 ~ file: index.js:48 ~ socket.on ~ chat:", chat)
                if (Object.values(chat).length > 1) {
                    dispatch(updateSingleMessageThunk(chat))
                } else {
                    dispatch(deleteSingleMessageThunk(chat.message_id))
                }
            } else {
                dispatch(getAllChannelMessagesThunk(channelId))
            }
            dispatch(getAllChannelsThunk(workspaceId))
        })

        return (() => {
            socket.disconnect()
        })
    }, [io])

    // useEffect(() => {
    //     socket.on('chat', (chat) => {
    //         console.log('Hitting socket ======================================================>')
    //         dispatch(getAllChannelsThunk(workspaceId))
    //         dispatch(getAllChannelMessagesThunk(channelId))
    //     })

    // }, [dispatch, channelId, Object.values(allMessages).length])

    const sendChat = async (e) => {
        e.preventDefault()
        await socket.emit('chat', { user: sessionUser.name, text: message, user_id: sessionUser.id, channel_id: channel.id })
        // dispatch(getAllChannelMessagesThunk(channelId))
        setMessage('')
    }

    if (channelId === '0') return null

    const messages = allMessages.filter(message => message.channel_id === +channelId)
    // console.log("🚀 ~ file: index.js:75 ~ SingleChannel ~ messages:", messages)

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
                            modalComponent={<DeleteChannelModal channel={channel} setCurrentChannelId={setCurrentChannelId} />}
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
                        {/* <div className='create-message-bottom'>
                        </div> */}
                        <button type="submit" className='create-message-button'>Send Message</button>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default SingleChannel;
