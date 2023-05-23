import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChannelThunk } from '../../store/channel';
import './SingleChannel.css'
import { createSingleMessageThunk, getAllMessagesThunk } from '../../store/message';
import DeleteMessageModal from '../DeleteMessageModal';
import EditMessageModal from '../EditMessageModal';
import OpenModalButton from '../OpenModalButton';
import { updateSingleMessageThunk } from '../../store/message';

function SingleChannel({ channelId }) {
    console.log('hitting single channel', channelId)
    const channel = useSelector(state => state.channel.currentChannel)
    const currentUser = useSelector(state => state.session.user)
    const messages = useSelector(state => state.message.messages)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [showEdit, setShowEdit] = useState(false)
    const [newMessage, setNewMessage] = useState(message);
    const [messageId, setMessageId] = useState()


    useEffect(() => {
        dispatch(getSingleChannelThunk(channelId))
        dispatch(getAllMessagesThunk(channelId))
    }, [dispatch, channelId, messages.length])

    if (!channel) return null

    const createMessage = async (e) => {
        e.preventDefault()
        console.log('Channel Id when creating message', channel.id)
        const newMessage = { 'text': message }
        dispatch(createSingleMessageThunk(newMessage, channel.id))
        dispatch(getSingleChannelThunk(channel.id))
        setMessage('')
    }

    // const editMessage = async (e) => {
    //     e.preventDefault()
    //     if (newMessage) {
    //         const message = {
    //             text: newMessage
    //         }
    //         dispatch(updateSingleMessageThunk(message, messageId))
    //         dispatch(getSingleChannelThunk(channelId))
    //     }
    // }

    console.log(messages)
    return (
        <div className='single-channel-container'>
            <div className='single-channel-header'>
                <strong>Channel Name: {channel.name}</strong>
                <div>
                    {channel.channel_users.length} members
                </div>
            </div>
            <div className='message-container'>
                <div className='all-messages-container'>
                    {messages.toReversed().map(message => {
                        return <>
                            <div className='single-message'>
                                {/* <form onSubmit={editMessage}>
                                <label>
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        required
                                    />
                                </label>
                                <button type="submit">Edit Message</button>
                            </form> */}
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
