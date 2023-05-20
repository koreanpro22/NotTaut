import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChannelThunk } from '../../store/channel';

function SingleChannel({ channelId }) {
    const channel = useSelector(state => state.channel.currentChannel)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleChannelThunk(channelId))
    }, [dispatch, channelId])

    if (!channel) return null
    console.log(channel)

    return (
        <div>
            <strong>{channel.name}</strong>
            <div>
                {channel.channel_users.length} members
            </div>
        </div>
    );
}

export default SingleChannel;
