import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Homepage.css';
import SingleWorkspace from '../SingleWorkspace';

function Homepage() {

    const sessionUser = useSelector(state => state.session.user);
    const [workspaceId, setWorkspaceId] = useState()

    const dispatch = useDispatch()


    if (!sessionUser) return null

    const workspaces = sessionUser.user_workspaces

    if (!workspaceId) {
        setWorkspaceId(workspaces[0].id)
    }

    return (
        <div className='homepage-container'>
            <div>
                <strong>Workspaces:</strong>
                <ul>
                    {workspaces.map(workspace => {
                        return <p className='singleWorkspace' key={workspace.id} onClick={() => setWorkspaceId(workspace.id)}>{workspace.id}</p>
                    })}
                </ul>
            </div>
            <SingleWorkspace workspaceId={workspaceId} />

        </div>
    );
}

export default Homepage;
