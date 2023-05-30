import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearWorkspace, getSingleWorkspaceThunk } from '../../store/workspace';
import './SingleWorkspace.css';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import { useHistory, useParams } from 'react-router-dom';
import SingleChannel from '../SingleChannel';
import { useChannelId, useChannelIdUpdate } from '../../context/ChannelIdProvider';
import { clearChannel } from '../../store/channel';
import { clearMessage } from '../../store/message';


function SingleWorkspace() {
    console.log('hitting workspace')
    const history = useHistory();
    const { workspaceId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const currentWorkspace = useSelector(state => state.workspace.currentWorkspace)
    const dispatch = useDispatch()
    const currentChannelId = useChannelId()
    const setCurrentChannelId = useChannelIdUpdate()
    console.log('workspaceId ', workspaceId, currentWorkspace)

    useEffect(() => {
        dispatch(getSingleWorkspaceThunk(workspaceId))
    }, [dispatch, currentChannelId, workspaceId])

    if (!sessionUser || !currentWorkspace) return null

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
            {/* <div className='all-workspaces'>
                {workspaces.map(workspace => {
                    return <div onClick={async () => {
                        console.log(workspace.id)
                        console.log('hitting click')
                        await history.push(`/workspace/${workspace.id}`)
                        await dispatch(clearChannel())
                        await dispatch(clearMessage())
                        await dispatch(clearWorkspace())
                    }} className='workspace-list'>
                        {workspace.name}
                    </div>
                })}
            </div> */}
            <div className='single-workspace-details'>
                <h4 className='workspace-details-header'>{currentWorkspace.name}</h4>
                {sessionUser.id === currentWorkspace.owner.id && <div>
                    <OpenModalButton
                        buttonText='Create New Channel'
                        modalComponent={<CreateChannelModal setCurrentChannelId={setCurrentChannelId} workspaceId={workspaceId} />}
                    />
                </div>}
                <div className='all-channels'>
                    {console.log(currentWorkspace.channels)}
                    {sessionUser.id === currentWorkspace.owner.id ? currentWorkspace.channels.map(channel => {
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
            <SingleChannel channelId={currentChannelId} />
        </div>
    );
}

export default SingleWorkspace;
