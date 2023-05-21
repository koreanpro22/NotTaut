import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChannelThunk } from '../../store/channel';

function SingleChannel({ channelId }) {
    console.log('hitting single channel')
    console.log('channel id', channelId)
    const channel = useSelector(state => state.channel.currentChannel)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleChannelThunk(channelId))
    }, [dispatch, channelId])
    console.log('channel ', channel)
    if (!channel) return null

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
