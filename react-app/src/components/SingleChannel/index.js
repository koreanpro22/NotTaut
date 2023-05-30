import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChannelThunk } from '../../store/channel';
import './SingleChannel.css'
import { getAllMessagesThunk } from '../../store/message';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import { useChannelIdUpdate } from '../../context/ChannelIdProvider';
import { io } from 'socket.io-client';
import MessageModal from '../MessageModal';
import '../MessageModal/MessageModal.css';

let socket;

function SingleChannel({ channelId }) {
    console.log('hitting single channel', channelId)
    const channel = useSelector(state => state.channel.currentChannel)
    const sessionUser = useSelector(state => state.session.user)
    const messages = useSelector(state => state.message.messages)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const setCurrentChannelId = useChannelIdUpdate()
    const timestamp = Date.now()
    const todayDate = new Date(timestamp)
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        dispatch(getSingleChannelThunk(channelId))
        socket = io();
        dispatch(getAllMessagesThunk(channelId))
        socket.on('chat', (chat) => {
            console.log('Hitting socket ======================================================>')
            dispatch(getSingleChannelThunk(channelId))
            dispatch(getAllMessagesThunk(channelId))

        })

        return (() => {
            socket.disconnect()
        })
    }, [dispatch, channelId, messages.length])

    // useEffect(() => {
    //     const createMessage = document.querySelector('.create-message-area');
    //     const keyDownHandler = event => {
    //         console.log('User pressed: ', event.key);
    //     };
    //     createMessage.addEventListener("focus", (event) => {
    //         console.log('hitting focus')
    //         if (event.key === 'Enter') {
    //             event.preventDefault();
    //             sendChat(event);
    //         }
    //     })
    //     document.addEventListener('keydown', keyDownHandler);
    //     return () => {
    //         document.removeEventListener('keydown', keyDownHandler);
    //     };

    // }, []);


    const sendChat = async (e) => {
        e.preventDefault()
        await socket.emit('chat', { user: sessionUser.name, text: message, user_id: sessionUser.id, channel_id: channel.id })
        dispatch(getAllMessagesThunk(channelId))
        setMessage('')
    }

    const deleteChat = async (e, messageId) => {
        e.preventDefault()
        await socket.emit('chat', { 'message_id': messageId })
        dispatch(getAllMessagesThunk(channelId))

    }

    if (!channel) return null

    return (
        <div className='single-channel-container'>
            {console.log('hitting return single channel')}
            <div className='single-channel-header'>
                <div>
                    <strong>Channel Name: {channel.name} </strong>
                    <i class="fas fa-chevron-down"></i>
                    {sessionUser.id === channel.workspace.owner_id && <div>
                        <OpenModalButton
                            buttonText='Edit'
                            modalComponent={<EditChannelModal channel={channel} />}
                        />
                        <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteChannelModal channel={channel} setCurrentChannelId={setCurrentChannelId} />}
                        />
                    </div>}
                </div>
                <div>
                    {channel.channel_users.length} members
                </div>
            </div>
            <div className='message-container'>
                <div className='all-messages-container'>
                    {console.log('messages in return ', messages)}
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
                                    <MessageModal user={sessionUser} channel={channel} message={message} deleteChat={deleteChat} />
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
