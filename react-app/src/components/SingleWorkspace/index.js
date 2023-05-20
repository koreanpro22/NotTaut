import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleWorkspaceThunk } from '../../store/workspace';
import SingleChannel from '../SingleChannel';
import './SingleWorkspace.css';

function SingleWorkspace({ workspaceId }) {
    console.log('hitting workspace')
    const workspace = useSelector(state => state.workspace.currentWorkspace)
    const [channelId, setChannelId] = useState('1')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleWorkspaceThunk(workspaceId))
    }, [dispatch, workspaceId])

    if (!workspace) return null

    const handleEditChannel = () => {
        console.log('hitting')
    }

    const handleDeleteChannel = () => {
        console.log('hitting')

    }


    return (
        <div className='workspace-container'>
            <div className='section-1'>
                <strong>Workspace Details</strong>
                {workspace.channels.map(channel => {
                    return <>
                        <div className='singleChannel' key={channel.id} >
                            <div className='channelName' onClick={() => setChannelId(channel.id)}>{channel.name}</div>
                            <div className='channelEdit' onClick={handleEditChannel}>Edit</div>
                            <div className='channelDelete' onClick={handleDeleteChannel}>Delete</div>
                        </div>
                    </>
                })}
            </div>
            <SingleChannel channelId={channelId} />
        </div>
    );
}

export default SingleWorkspace;
