import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleWorkspaceThunk } from '../../store/workspace';
import './SingleWorkspace.css';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import { getSingleChannelThunk } from '../../store/channel';
import { useParams } from 'react-router-dom';
import SingleChannel from '../SingleChannel';
import { authenticate } from '../../store/session';
import { useChannelId, useChannelIdUpdate } from '../../context/ChannelIdProvider';


function SingleWorkspace() {
    console.log('hitting workspace')
    const { workspaceId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const currentChannelId = useChannelId()
    const setCurrentChannelId = useChannelIdUpdate()

    if (!sessionUser) return null

    const channels = sessionUser.user_channels.filter(channel => channel.workspace_id === +workspaceId)
    const workspaces = sessionUser.user_workspaces

    console.log('Current Channel Id', currentChannelId)


    if (channels.length && !currentChannelId) {
        setCurrentChannelId(channels[0].id)
    }

    const handleChannelClick = async (channelId) => {
        setCurrentChannelId(channelId)
    }

    return (
        <div className='workspace-container'>
            <div className='all-workspaces'>
                {workspaces.map(workspace => {
                    return <div>
                        {workspace.name}
                    </div>
                })}
            </div>
            <div className='single-workspace-details'>
                <h4 className='workspace-details-header'>Workspace Details</h4>
                <div>
                    <OpenModalButton
                        buttonText='Create New Channel'
                        modalComponent={<CreateChannelModal setCurrentChannelId={setCurrentChannelId}  workspaceId={workspaceId} />}
                    />
                </div>
                <div className='all-channels'>
                    {channels.map(channel => {
                        return <div className='singleChannel' key={channel.id}>
                            <div className='channel-name' onClick={() => handleChannelClick(channel.id)}>{channel.name}</div>
                        </div>

                    })}
                </div>
            </div>
            <SingleChannel channelId={currentChannelId} />
        </div>
    );
}

export default SingleWorkspace;
