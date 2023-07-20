import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AllChannels.css';
import { useHistory, useParams } from 'react-router-dom';
function AllChannels() {
    const { workspaceId } = useParams();

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allChannelsObj = useSelector(state => state.channel.allChannels)
    const allChannels = Object.values(allChannelsObj)
    const channels = allChannels.filter(channel => channel.workspace_id === +workspaceId)

    if (!sessionUser) return null

    return (
        <div className='all-channels-container'>
            {channels.map(channel => {
                return <div>channel.name</div>
            })}
        </div>
    );
}

export default AllChannels;
