import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateChannelModal from '../CreateChannelModal';
import OpenModalButton from '../OpenModalButton';
import SingleChannel from '../SingleChannel';
import { getAllUserWorkspacesThunk } from '../../store/workspace';
import { getAllChannelsThunk, setCurrentChannelThunk } from '../../store/channel';
import { getSingleUserThunk } from '../../store/user';
import './SingleWorkspace.css';
import EditWorkspaceModal from '../EditWorkspaceModal';
import DeleteWorkspaceModal from '../DeleteWorkspaceModal';

function SingleWorkspace() {
    const { workspaceId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const allWorkspacesObj = useSelector(state => state.workspace.allWorkspaces);
    const allWorkspaces = Object.values(allWorkspacesObj)

    const allChannelsObj = useSelector(state => state.channel.allChannels)
    const allChannels = Object.values(allChannelsObj)
    const currentChannelId = useSelector(state => state.channel.currentChannel);
    const channels = allChannels.filter(channel => channel.workspace_id === +workspaceId)
    const dispatch = useDispatch()

    const [showWorkspaceOption, setShowWorkspaceOption] = useState(false);
    const [showChannelOption, setShowChannelOption] = useState(false);
    const [showChannels, setShowChannels] = useState(true);

    useEffect(() => {
        dispatch(getAllUserWorkspacesThunk(allWorkspaces))
        dispatch(getAllChannelsThunk(channels, workspaceId))
    }, [dispatch])

    if (!sessionUser || !allWorkspaces.length || !channels.length) return null
    if (!currentChannelId) dispatch(setCurrentChannelThunk(channels[0].id))

    const handleShowWorkspaceOption = () => {

    }

    const handleShowChannelOption = () => {

    }

    const handleThreads = () => {
        alert('Feature Coming Soon!')
    }

    const handleLater = () => {
        alert('Feature Coming Soon!')

    }

    const handleMentionsReactions = () => {
        alert('Feature Coming Soon!')

    }

    const handleDraftsSent = () => {
        alert('Feature Coming Soon!')

    }

    const handleAllChannels = () => {
        alert('Feature Coming Soon!')

    }

    const handleShowChannels = () => {
        setShowChannels(!showChannels)
    }



    const handleDeleteWorkspace = () => {

    }

    const handleInviteToWorkspace = (e) => {
        e.preventDefault()
        dispatch(getSingleUserThunk("email", "demo@aa.io"))
    }

    const currentWorkspace = allWorkspacesObj[workspaceId]
    const handleChannelClick = async (channelId) => dispatch(setCurrentChannelThunk(channelId))

    const hideChannels = showChannels ? '' : 'hide'

    return (
        <div className='workspace-container'>
            <div className='single-workspace-details'>
                <div>
                    <h4 className='workspace-details-header'>{currentWorkspace.name} <i class="fas fa-chevron-down"></i></h4>
                    <div className='workspace-edit-delete'>
                        {/* <button onClick={(e) => handleInviteToWorkspace(e)}>Invite User</button> */}
                        <OpenModalButton buttonText='Edit Workspace' modalComponent={<EditWorkspaceModal workspace={currentWorkspace} />} />
                        <OpenModalButton buttonText='Delete Workspace' modalComponent={<DeleteWorkspaceModal workspaceId={currentWorkspace.id} />} />
                    </div>
                </div>
                <div className='extra-features'>
                    <div onClick={handleThreads}> <i class="fas fa-comment-dots"></i> Threads</div>
                    <div onClick={handleLater} > <i class="fas fa-bookmark"></i> Later</div>
                    <div onClick={handleMentionsReactions} > <i class="fas fa-at"></i> Mentions & Reactions</div>
                    <div onClick={handleDraftsSent} ><i class="fas fa-paper-plane"></i> Drafts & Sent</div>
                    <div onClick={handleAllChannels} ><i class="fas fa-search"></i> All Channels</div>
                </div>
                <div className='all-channels' >
                    <div className='channel-options' onClick={handleShowChannels}>{showChannels ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-right" ></i>} Channels</div>
                    {sessionUser.id === currentWorkspace.owner_id && <div>
                        <OpenModalButton buttonText='New Channel' className='create-channel-button' modalComponent={<CreateChannelModal workspaceId={workspaceId} />} />
                    </div>}
                    {sessionUser.id === currentWorkspace.owner_id ? channels.map(channel => {
                        return <div className={`singleChannel ${hideChannels}`} key={channel.id}>
                            <div className='channel-name' onClick={() => handleChannelClick(channel.id)}>{channel.name}</div>
                        </div>
                    }) : channels.filter(channel => channel.channel_users[sessionUser.id]).map(channel => {
                        return <div className={`singleChannel ${hideChannels}`} key={channel.id}>
                            <div className='channel-name' onClick={() => handleChannelClick(channel.id)}>{channel.name}</div>
                        </div>
                    })}
                </div>
            </div>
            <SingleChannel channels={channels} channelId={currentChannelId} />
        </div>
    );
}

export default SingleWorkspace;
