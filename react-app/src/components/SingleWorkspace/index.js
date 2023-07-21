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
    console.log('use params', useParams())
    const sessionUser = useSelector(state => state.session.user)
    const allWorkspacesObj = useSelector(state => state.workspace.allWorkspaces);
    const allChannelsObj = useSelector(state => state.channel.allChannels)
    const currentChannelId = useSelector(state => state.channel.currentChannel);
    const dispatch = useDispatch()

    // const [currentChannelId, setCurrentChannelId] = useState(channels[0].id)
    const [showWorkspaceOption, setShowWorkspaceOption] = useState(false);
    const [showChannels, setShowChannels] = useState(true);
    const [showAllChannels, setShowAllChannels] = useState(false);

    useEffect(() => {
        dispatch(getAllUserWorkspacesThunk(allWorkspaces))
        dispatch(getAllChannelsThunk(channels, workspaceId))
    }, [dispatch])

    const allWorkspaces = Object.values(allWorkspacesObj)
    const allChannels = Object.values(allChannelsObj)
    const channels = allChannels.filter(channel => channel.workspace_id === +workspaceId)

    if (!sessionUser || !allWorkspaces.length || !channels.length) return null
    if (!currentChannelId) dispatch(setCurrentChannelThunk(channels[0].id))

    const handleShowWorkspaceOption = () => {
        setShowWorkspaceOption(!showWorkspaceOption)
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


    const handleShowChannels = () => {
        setShowChannels(!showChannels)
    }

    // const handleInviteToWorkspace = (e) => {
    //     e.preventDefault()
    //     dispatch(getSingleUserThunk("email", "demo@aa.io"))
    // }

    const currentWorkspace = allWorkspacesObj[workspaceId]
    const handleAllChannels = async () => {
        dispatch(setCurrentChannelThunk(0))
        setShowAllChannels(true)
    }
    const handleChannelClick = async (channelId) => dispatch(setCurrentChannelThunk(channelId))

    const hideChannels = showChannels ? '' : 'hide'
    const hideWorkspaceOptions = showWorkspaceOption ? '' : 'hide'

    return (
        <div className='workspace-container'>
            <div className='single-workspace-details'>
                <div className='workspace-details-header'>
                    <h4 className='workspace-name' onClick={handleShowWorkspaceOption}>{currentWorkspace.name} {showWorkspaceOption ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-right" ></i>}</h4>
                    {sessionUser.id === currentWorkspace.owner_id && <div className={`workspace-edit-delete ${hideWorkspaceOptions}`}>
                        <OpenModalButton onModalClose={handleShowWorkspaceOption} buttonText='Edit Workspace' className='edit-workspace-button' modalComponent={<EditWorkspaceModal workspace={currentWorkspace} />} />
                        {console.log(allWorkspaces[0], workspaceId)}
                        {+workspaceId !== allWorkspaces[0].id && <OpenModalButton onModalClose={handleShowWorkspaceOption} buttonText='Delete Workspace' className='delete-workspace-button' modalComponent={<DeleteWorkspaceModal workspaceId={currentWorkspace.id} />} />}
                    </div>}
                    {/* <button onClick={(e) => handleInviteToWorkspace(e)}>Invite User</button> */}
                </div>
                <div className='extra-features'>
                    {/* <div onClick={handleThreads}> <i class="fas fa-comment-dots"></i> Threads</div> */}
                    {/* <div onClick={handleLater} > <i class="fas fa-bookmark"></i> Later</div> */}
                    {/* <div onClick={handleMentionsReactions} > <i class="fas fa-at"></i> Mentions & Reactions</div> */}
                    {/* <div onClick={handleDraftsSent} ><i class="fas fa-paper-plane"></i> Drafts & Sent</div> */}
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
            {console.log('channels prop => ', channels)}
            {currentChannelId && <SingleChannel channels={channels} channelId={currentChannelId} />}
            {showAllChannels && <div className='all-channels-container'>
                {channels.map(channel => {
                    return <div>{channel.name}</div>
                })}
            </div>}
        </div>
    );
}

export default SingleWorkspace;
