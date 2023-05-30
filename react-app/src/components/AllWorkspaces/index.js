import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AllWorkspaces.css';
import { NavLink, useHistory } from 'react-router-dom';
import { clearChannel } from '../../store/channel';
import { clearMessage } from '../../store/message';
import { clearWorkspace } from '../../store/workspace';
function AllWorkspaces() {

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(clearChannel())
        dispatch(clearMessage())
        dispatch(clearWorkspace())
    }, [dispatch])

    if (!sessionUser) return null


    // default workspace image = https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701

    return (
        <div className='all-workspaces-container'>
            <h1>Choose your workspace</h1>
            <div className='workspace-tiles'>
                {sessionUser.user_workspaces.map(workspace => {
                    return <div onClick={() => {
                        history.push(`/workspace/${workspace.id}`)
                    }}>
                        <div key={workspace.id} className='single-workspace-tile'>
                            <h3>{workspace.name}</h3>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701' alt='Workspace Image' />
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

export default AllWorkspaces;
