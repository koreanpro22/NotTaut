import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleWorkspaceThunk } from '../../store/workspace';
import './SingleWorkspace.css';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';
import {  getSingleChannelThunk } from '../../store/channel';
import { useParams } from 'react-router-dom';
import SingleChannel from '../SingleChannel';


function SingleWorkspace({ startChannelId }) {
    console.log('hitting workspace')
    const { workspaceId } = useParams()
    const workspace = useSelector(state => state.workspace.currentWorkspace)
    const [currentChannelId, setCurrentChannelId] = useState(startChannelId)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleWorkspaceThunk(workspaceId))
        if (!currentChannelId) {
            dispatch(getSingleChannelThunk(workspace.channels[0].id))
        } else {
            dispatch(getSingleChannelThunk(currentChannelId))
        }
    }, [dispatch, workspaceId])

    const handleChannelClick = async (channelId) => {
        setCurrentChannelId(channelId)
    }

    if (!workspace) return null
    console.log('channel id ', currentChannelId)
    return (
        <div className='workspace-container'>
            <div className='single-workspace-details'>
                <h4 className='workspace-details-header'>Workspace Details</h4>
                <div>
                    <OpenModalButton
                        buttonText='Create New Channel'
                        modalComponent={<CreateChannelModal workspaceId={workspaceId} />}
                    />
                </div>
                <div className='all-channels'>
                    {workspace.channels.map(channel => {
                        return <div className='singleChannel' key={channel.id}>
                            <div className='channel-name' onClick={() => handleChannelClick(channel.id)}>{channel.name}</div>
                            <div className='edit-delete-channel-modals'>
                                <OpenModalButton
                                    buttonText='Edit'
                                    modalComponent={<EditChannelModal name={channel.name} topic={channel.topic} description={channel.description} workspaceId={workspaceId} channelId={channel.id} />}
                                />
                                <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteChannelModal workspaceId={workspaceId} channelId={channel.id} />}
                                />
                            </div>
                        </div>

                    })}
                </div>
            </div>
            <SingleChannel channelId={currentChannelId || workspace.channels[0].id}/>
        </div>
    );
}

export default SingleWorkspace;
