import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getSingleWorkspaceThunk } from '../../store/workspace';
import './SingleWorkspace.css';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import { useParams } from 'react-router-dom';
import SingleChannel from '../SingleChannel';
import { useChannelId, useChannelIdUpdate } from '../../context/ChannelIdProvider';

function SingleWorkspace() {
    const { workspaceId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const currentWorkspace = useSelector(state => state.workspace.currentWorkspace)
    const dispatch = useDispatch()
    const currentChannelId = useChannelId()
    const setCurrentChannelId = useChannelIdUpdate()

    useEffect(() => {
        // dispatch(getSingleWorkspaceThunk(workspaceId))
    }, [dispatch, currentChannelId, workspaceId])

    if (!sessionUser || !currentWorkspace) return null

    const channels = sessionUser.user_channels.filter(channel => channel.workspace_id === +workspaceId)
    const workspaces = sessionUser.user_workspaces




    if (channels.length && !currentChannelId) {
        setCurrentChannelId(channels[0].id)
    }

    const handleChannelClick = async (channelId) => {
        setCurrentChannelId(channelId)
    }

    return (
        <div className='workspace-container'>
            <div className='single-workspace-details'>
                <h4 className='workspace-details-header'>{currentWorkspace.name}</h4>
                {sessionUser.id === currentWorkspace.owner.id && <div>
                    <OpenModalButton
                        buttonText='Create New Channel'
                        modalComponent={<CreateChannelModal setCurrentChannelId={setCurrentChannelId} workspaceId={workspaceId} />}
                    />
                </div>}
                <div className='all-channels'>
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
