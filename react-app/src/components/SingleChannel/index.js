import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChannelThunk } from '../../store/channel';
import './SingleChannel.css'
import { createSingleMessageThunk, getAllMessagesThunk } from '../../store/message';
import DeleteMessageModal from '../DeleteMessageModal';
import EditMessageModal from '../EditMessageModal';
import OpenModalButton from '../OpenModalButton';

function SingleChannel({ channelId }) {
    console.log('hitting single channel')
    const channel = useSelector(state => state.channel.currentChannel)
    const currentUser = useSelector(state => state.session.user)
    // const messages = useSelector(state => state.message.messagees)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        dispatch(getSingleChannelThunk(channelId))
        dispatch(getAllMessagesThunk(channelId))
    }, [dispatch, channelId])

    if (!channel) return null

    const createMessage = async (e) => {
        e.preventDefault()
        const newMessage = { 'text': message }
        dispatch(createSingleMessageThunk(newMessage, channelId))
        dispatch(getSingleChannelThunk(channelId))
        setMessage('')
    }

    const editMessage = async () => {
        setShowEdit(true)
    }


    return (
        <div className='single-channel-container'>
            <div className='single-channel-header'>
                <strong>Channel Name: {channel.name}</strong>
                <div>
                    {channel.channel_users.length} members
                </div>
            </div>
            <div className='all-messages-container'>
                {channel.messages.toReversed().map(message => {
                    return <>
                        <div className='single-message'>
                            {message.text}
                            {currentUser.id === message.user_id && <div className='message-edit-delete'>
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
                        {showEdit ?
                            '1' : '2'}
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
        </div >
    );
}

export default SingleChannel;
