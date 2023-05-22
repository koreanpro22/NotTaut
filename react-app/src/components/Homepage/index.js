import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Homepage.css';
import SingleWorkspace from '../SingleWorkspace';
import { getSingleWorkspaceThunk } from '../../store/workspace';

function Homepage() {

    const sessionUser = useSelector(state => state.session.user);
    const [workspaceId, setWorkspaceId] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSingleWorkspaceThunk(workspaceId))
    }, [dispatch])


    if (!sessionUser) return null
    if (!workspaceId) {
        setWorkspaceId(sessionUser.user_workspaces[0].id)
    }

    return (
        <div className='homepage-container'>
            {/* <div>
                <strong>Workspaces:</strong>
                <ul>
                    {workspace.map(workspace => {
                        return <p className='singleWorkspace' key={workspace.id} onClick={() => setWorkspaceId(workspace.id)}>{workspace.id}</p>
                    })}
                </ul>
            </div> */}
            <SingleWorkspace workspaceId={workspaceId} />
        </div>
    );
}

export default Homepage;
