import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './AllWorkspaces.css';
import { NavLink } from 'react-router-dom';
function AllWorkspaces() {

    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) return null

    // default workspace image = https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701

    return (
        <div className='all-workspaces-container'>
            <h1>Choose your workspace</h1>
            <div className='workspace-tiles'>
                {sessionUser.user_workspaces.map(workspace => {
                    return <NavLink to={`/workspace/${workspace.id}`}>
                        <div key={workspace.id} className='single-workspace-tile'>
                            {workspace.name}
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701' alt='Workspace Image' />
                        </div>
                    </NavLink>
                })}
            </div>
        </div>
    );
}

export default AllWorkspaces;
