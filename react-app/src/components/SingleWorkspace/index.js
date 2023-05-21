import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleWorkspaceThunk } from '../../store/workspace';
import SingleChannel from '../SingleChannel';
import './SingleWorkspace.css';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import EditChannelModal from '../EditChannelModal';
import DeleteChannelModal from '../DeleteChannelModal';


function SingleWorkspace({ workspaceId }) {
    console.log('hitting workspace')
    const workspace = useSelector(state => state.workspace.currentWorkspace)
    const [channelId, setChannelId] = useState('2')
    const dispatch = useDispatch()
    console.log(channelId)

    useEffect(() => {
        dispatch(getSingleWorkspaceThunk(workspaceId))
        // setChannelId(workspace?.channels[0].id)
    }, [dispatch, workspaceId])

    if (!workspace) return null

    return (
        <div className='workspace-container'>
            <div className='section-1'>
                <strong>Workspace Details</strong>
                <div>
                    <OpenModalButton
                        buttonText='Create New Channel'
                        modalComponent={<CreateChannelModal workspaceId={workspaceId} />}
                    />
                </div>
                {workspace.channels.map(channel => {
                    return <>
                        <div className='singleChannel' key={channel.id} >
                            <div className='channelName' onClick={() => setChannelId(channel.id)}>{channel.name}</div>
                            <div>
                                <OpenModalButton
                                    buttonText='Edit'
                                    modalComponent={<EditChannelModal workspaceId={workspaceId} channelId={channel.id} />}
                                />
                            </div>
                            <div>
                                <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteChannelModal workspaceId={workspaceId} channelId={channel.id} />}
                                />
                            </div>
                        </div>
                    </>
                })}
            </div>
            <SingleChannel channelId={channelId} />
        </div>
    );
}

export default SingleWorkspace;
