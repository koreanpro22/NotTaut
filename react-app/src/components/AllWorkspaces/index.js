import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AllWorkspaces.css';
import { useHistory } from 'react-router-dom';
import { getAllUserWorkspacesThunk, createSingleWorkspaceThunk } from '../../store/workspace';
function AllWorkspaces() {

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allWorkspacesObj = useSelector(state => state.workspace.allWorkspaces);
    const allWorkspaces = Object.values(allWorkspacesObj)
    const workspaces = allWorkspaces.filter(workspace => workspace.workspace_users.includes(sessionUser.id))
    console.log('Workspaces in all workspace', workspaces)

    const [showNewWorkspace, setShowNewWorkspace] = useState(false)
    const [showNewUser, setShowNewUser] = useState(false)
    const [addedUsers, setAddedUsers] = useState([])
    const [workspaceName, setWorkspaceName] = useState('')

    useEffect(() => {
        dispatch(getAllUserWorkspacesThunk(workspaces))
    }, [dispatch, allWorkspaces.length])

    if (!sessionUser || !allWorkspaces.length) return null

    const openNewWorkspace = () => {
        return setShowNewWorkspace(!showNewWorkspace)
    }

    const handleNewWorkspace = async (e) => {
        e.preventDefault()
        console.log('hitting create')
        dispatch(createSingleWorkspaceThunk(workspaceName)).then((workspace) => {
            history.push(`/workspace/${workspace.id}`)
        })
    }
    // default workspace image = https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701

    return (
        <div className='all-workspaces-container'>
            <h1>Choose your workspace</h1>
            <div className='workspace-tiles'>
                {workspaces ?
                    workspaces.map(workspace => {
                        return <div onClick={() => { history.push(`/workspace/${workspace.id}`) }}>
                            <div key={workspace.id} className='single-workspace-tile'>
                                <h3>{workspace.name}</h3>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Zunm_NQV4NA39v57qA4FPasJnxrAxzwyYLGLGI7YBw&usqp=CAU&ec=48665701' alt='Workspace Image' />
                            </div>
                        </div>
                    }) : null}
            </div>
            <div>
                <button onClick={openNewWorkspace}>Create New Workspace</button>
            </div>
            <div className={`${showNewWorkspace ? 'create-workspace-container' : 'hide'}`}>
                <h1>
                    This is The form
                </h1>
                <form onSubmit={(e) => handleNewWorkspace(e)} className='create-workspace-form'>
                    <div>
                        <input
                            size="20"
                            placeholder='Workspace Name'
                            type="text"
                            value={workspaceName}
                            maxLength={40}
                            onChange={(e) => setWorkspaceName(e.target.value)}
                            required
                        />
                        <label style={{ 'color': 'white' }}> {workspaceName.length}/40</label>
                    </div>
                    <button type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
}

export default AllWorkspaces;
