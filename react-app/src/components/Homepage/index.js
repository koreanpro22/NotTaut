import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Homepage.css';
import SingleWorkspace from '../SingleWorkspace';
import { getAllWorkspaceThunk, getSingleWorkspaceThunk } from '../../store/workspace';

function Homepage(props) {

    const sessionUser = useSelector(state => state.session.user);
    const [workspaceId, setWorkspaceId] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllWorkspaceThunk())
        // dispatch(getSingleWorkspaceThunk(workspaceId))
    }, [dispatch])


    if (!sessionUser) return null

    return (
        <div className='homepage-container'>
            <div>
                <strong>Workspaces:</strong>
                <ul>
                    {/* {workspaces.map(workspace => {
                        return <p className='singleWorkspace' key={workspace.id} onClick={() => setWorkspaceId(workspace.id)}>{workspace.name}</p>
                    })} */}
                    {sessionUser.user_workspaces.map(workspace => {
                        return <p className='singleWorkspace' key={workspace.id} onClick={() => setWorkspaceId(workspace.id)}>{workspace.name}</p>
                    })}
                </ul>
            </div>
            <SingleWorkspace workspaceId={workspaceId} />
        </div>
    );
}

export default Homepage;
