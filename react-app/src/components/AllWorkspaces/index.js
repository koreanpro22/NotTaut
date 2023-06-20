import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AllWorkspaces.css';
import { useHistory } from 'react-router-dom';
import { getAllUserWorkspacesThunk } from '../../store/workspace';
function AllWorkspaces() {

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allWorkspacesObj = useSelector(state => state.workspace.allWorkspaces);
    const allWorkspaces = Object.values(allWorkspacesObj)
    // const workspaces = allWorkspaces.filter(workspace => workspace.)

    useEffect(() => {
        dispatch(getAllUserWorkspacesThunk(allWorkspaces))
    }, [dispatch, allWorkspaces.length])

    if (!sessionUser || !allWorkspaces.length) return null

    // default workspace image = https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701
    return (
        <div className='all-workspaces-container'>
            <h1>Choose your workspace</h1>
            <div className='workspace-tiles'>
                {Object.values(allWorkspaces).length ?
                    allWorkspaces.map(workspace => {
                        return <div onClick={() => { history.push(`/workspace/${workspace.id}`) }}>
                            <div key={workspace.id} className='single-workspace-tile'>
                                <h3>{workspace.name}</h3>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701' alt='Workspace Image' />
                            </div>
                        </div>
                    }) : null}
            </div>
        </div>
    );
}

export default AllWorkspaces;
