import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import SingleChannel from '../SingleChannel';
import { useChannelId, useChannelIdUpdate } from '../../context/ChannelIdProvider';
import { getAllUserWorkspacesThunk } from '../../store/workspace';
import { getAllChannelsThunk } from '../../store/channel';
import './SingleWorkspace.css';

function SingleWorkspace() {
    const { workspaceId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const allWorkspacesObj = useSelector(state => state.workspace.allWorkspaces);
    const allWorkspaces = Object.values(allWorkspacesObj)
    const allChannelsObj = useSelector(state => state.channel.allChannels)
    const allChannels = Object.values(allChannelsObj)
    const channels = allChannels.filter(channel => channel.workspace_id === +workspaceId)
    const dispatch = useDispatch()
    const [channelId, setChannelId] = useState('0')
    const currentChannelId = useChannelId()
    const setCurrentChannelId = useChannelIdUpdate()

    useEffect(() => {
        dispatch(getAllUserWorkspacesThunk(allWorkspaces))
        dispatch(getAllChannelsThunk(channels, workspaceId))
    }, [dispatch])

    if (!sessionUser || !allWorkspaces.length) return null

    const currentWorkspace = allWorkspacesObj[workspaceId]

    // if (!channels.length && !currentChannelId) {
    //     setCurrentChannelId(channels[0].id)
    // }

    if (!channels.length) return null

    const handleChannelClick = async (channelId) => {
        // setCurrentChannelId(channelId)
        setChannelId(channelId)
    }

    return (
        <div className='workspace-container'>
            <div className='single-workspace-details'>
                <h4 className='workspace-details-header'>{currentWorkspace.name}</h4>
                {sessionUser.id === currentWorkspace.owner_id && <div>
                    <OpenModalButton
                        buttonText='Create New Channel'
                        modalComponent={<CreateChannelModal setCurrentChannelId={setCurrentChannelId} workspaceId={workspaceId} />}
                    />
                </div>}
                <div className='all-channels'>
                    {sessionUser.id === currentWorkspace.owner_id ? channels.map(channel => {
                        return <div className='singleChannel' key={channel.id}>
                            <div className='channel-name' onClick={() => handleChannelClick(channel.id)}>{channel.name}</div>
                        </div>
                    }) : channels.map(channel => {
                        return <div className='singleChannel' key={channel.id}>
                            <div className='channel-name' onClick={() => handleChannelClick(channel.id)}>{channel.name}</div>
                        </div>

                    })}
                </div>
            </div>
            {/* <SingleChannel channelId={currentChannelId} /> */}
            <SingleChannel channelId={channelId} />
        </div>
    );
}

export default SingleWorkspace;
