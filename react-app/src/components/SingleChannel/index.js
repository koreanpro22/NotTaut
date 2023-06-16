import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChannelsThunk, getSingleChannelThunk } from '../../store/channel';
import './SingleChannel.css'
import { getAllChannelMessagesThunk } from '../../store/message';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import { useChannelIdUpdate } from '../../context/ChannelIdProvider';
import { io } from 'socket.io-client';
import MessageModal from '../MessageModal';
import '../MessageModal/MessageModal.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

let socket;

function SingleChannel({ channelId }) {
    const { workspaceId } = useParams();
    const channel = useSelector(state => state.channel.currentChannel)
    const allChannels = useSelector(state => state.channel.allWorkspaceChannels)
    const sessionUser = useSelector(state => state.session.user)
    const allMessages = useSelector(state => state.message.messages)
    console.log(allMessages)
    const workspace = useSelector(state => state.workspace.currentWorkspace)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const setCurrentChannelId = useChannelIdUpdate()
    const timestamp = Date.now()
    const todayDate = new Date(timestamp)
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        socket = io();
        socket.on('chat', (chat) => {
            console.log('Hitting socket ======================================================>')
            dispatch(getSingleChannelThunk(channel, channelId))
            dispatch(getAllChannelsThunk(workspaceId))
            dispatch(getAllChannelMessagesThunk(channelId))
        })

        return (() => {
            socket.disconnect()
        })
    }, [dispatch, channelId, Object.values(allMessages).length])

    const sendChat = async (e) => {
        e.preventDefault()
        await socket.emit('chat', { user: sessionUser.name, text: message, user_id: sessionUser.id, channel_id: channel.id })
        dispatch(getAllChannelMessagesThunk(channelId))
        setMessage('')
    }
    console.log(channel)

    if (!channel) return null

    const messages = Object.values(allMessages);

    return (
        <div className='single-channel-container'>
            <div className='single-channel-header'>
                <div>
                    <strong>Channel Name: {channel.name} </strong>
                    <i class="fas fa-chevron-down"></i>
                    {sessionUser.id === channel.workspace.owner_id && <div>
                        <OpenModalButton
                            buttonText='Edit'
                            modalComponent={<EditChannelModal channel={channel} />}
                        />
                        {channel.id !== workspace.channels[0].id && <OpenModalButton
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
                                    <MessageModal user={sessionUser} channel={channel} message={message} />
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
