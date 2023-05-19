import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Homepage.css';
import { getAllChannelsThunk } from '../../store/channel';

function Homepage() {

    const sessionUser = useSelector(state => state.session.user);
    const workspace_id = sessionUser.user_workspaces[0].id
    const channels = useSelector(state => state.channel.channels)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllChannelsThunk(workspace_id))
    }, [dispatch])

    if (!sessionUser) return null

    console.log('CHANNELS', channels)
    return (
        <div>
            <h1>
                This is the current workspace: {sessionUser.user_workspaces[0].name}
            </h1>
            <div className='big-box-container'>
                <div className='section-1'>
                    <h1>
                        section 1
                    </h1>
                    {channels.map(channel => {
                        return <div>
                            <p>
                                {channel.name}
                            </p>
                        </div>
                    })}
                </div>
                <div className='section-2'>
                    <h1>
                        section 2
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
