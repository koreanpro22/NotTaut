import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChannelThunk } from '../../store/channel';
import './SingleChannel.css'
import { createSingleMessageThunk, getAllMessagesThunk } from '../../store/message';
import DeleteMessageModal from '../DeleteMessageModal';
import EditMessageModal from '../EditMessageModal';
import OpenModalButton from '../OpenModalButton';
import { updateSingleMessageThunk } from '../../store/message';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import { useChannelIdUpdate } from '../../context/ChannelIdProvider';
import { io } from 'socket.io-client';
import { getChannelMessages } from '../../store/message';
import MessageModal from '../SingleMessageModal';

let socket;

function SingleChannel({ channelId }) {
    console.log('hitting single channel', channelId)
    const channel = useSelector(state => state.channel.currentChannel)
    const sessionUser = useSelector(state => state.session.user)
    const messages = useSelector(state => state.message.messages)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const [channelMessages, setChannelMessages] = useState([]);

    const setCurrentChannelId = useChannelIdUpdate()

    // useEffect(() => {
    //     dispatch(getSingleChannelThunk(channelId));
    // }, [dispatch])

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


    console.log('CHANNEL ID ', channelId)
    console.log('CHANNEL ', channel)
    console.log('CHANNEL Messages', messages)

    if (!channel) return null

    const sendChat = async (e) => {
        e.preventDefault()
        await socket.emit('chat', { user: sessionUser.name, text: message, user_id: sessionUser.id, channel_id: channel.id})
        dispatch(getAllMessagesThunk(channelId))
        setMessage('')
    }

    const deleteChat = async (e, messageId) => {
        e.preventDefault()
        await socket.emit('chat', { 'message_id': messageId})
        dispatch(getAllMessagesThunk(channelId))

    }


    return (
        <div className='single-channel-container'>
            {console.log('hitting return single channel')}
            <div className='single-channel-header'>
                <div>
                    <strong>Channel Name: {channel.name}</strong>
                    <OpenModalButton
                        buttonText='Edit'
                        modalComponent={<EditChannelModal channel={channel}/>}
                    />
                    <OpenModalButton
                        buttonText='Delete'
                        modalComponent={<DeleteChannelModal channel={channel} setCurrentChannelId={setCurrentChannelId} />}
                    />
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
                                {message.text}
                                {console.log('session user in map ', sessionUser)}
                                {console.log('Message in map ', message)}
                                <MessageModal message={message} deleteChat={deleteChat}/>
                            </div>
                        </>
                    })}
                </div >
                <div className='create-message-container'>
                    {/* <form onSubmit={createMessage}>
                        <label>
                            <input
                                placeholder='Message {channel.name}'
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Send Message</button>
                    </form> */}
                    <form onSubmit={sendChat}>
                        <label>
                            <input
                                placeholder='Message {channel.name}'
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default SingleChannel;
