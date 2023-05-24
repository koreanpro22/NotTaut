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

function SingleChannel({ channelId }) {
    console.log('hitting single channel', channelId)
    const channel = useSelector(state => state.channel.currentChannel)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const setCurrentChannelId = useChannelIdUpdate()



    useEffect(() => {
        dispatch(getSingleChannelThunk(channelId))
        dispatch(getAllMessagesThunk(channelId))
    }, [dispatch, channelId])

    console.log('CHANNEL ', channel)

    if (!channel) return null

    const messages = channel.messages

    const createMessage = async (e) => {
        e.preventDefault()
        console.log('Channel Id when creating message', channel.id)
        const newMessage = { 'text': message }
        dispatch(createSingleMessageThunk(newMessage, channel.id))
        dispatch(getSingleChannelThunk(channel.id))
        setMessage('')
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
                    {messages.toReversed().map(message => {
                        return <>
                            <div className='single-message'>
                                {message.text}
                                {sessionUser.id === message.user_id && <div className='message-edit-delete'>
                                    <OpenModalButton
                                        buttonText='Edit'
                                        modalComponent={<EditMessageModal message={message.text} channelId={channel.id} messageId={message.id} />}
                                    />
                                    <OpenModalButton
                                        buttonText='Delete'
                                        modalComponent={<DeleteMessageModal channelId={channel.id} messageId={message.id} />}
                                    />
                                </div>}
                            </div>
                        </>
                    })}
                </div >
                <div className='create-message-container'>
                    <form onSubmit={createMessage}>
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
