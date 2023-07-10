// constants
const GET_ALL_USER_WORKSPACES = "workspace/GET_ALL_USER_WORKSPACES";
const CREATE_SINGLE_WORKSPACE = "workspace/CREATE_SINGLE_WORKSPACE";
const UPDATE_SINGLE_WORKSPACE = "workspace/UPDATE_SINGLE_WORKSPACE";
const CLEAR = "workspace/CLEAR";

const getAllUserWorkspacesAction = (workspaces) => ({
	type: GET_ALL_USER_WORKSPACES,
	payload: workspaces,
});

const createSingleWorkspaceAction = (workspace) => ({
	type: CREATE_SINGLE_WORKSPACE,
	payload: workspace,
});

const updateSingleWorkspaceAction = (workspace) => ({
	type: UPDATE_SINGLE_WORKSPACE,
	payload: workspace,
});

export const clearWorkspace = () => ({
	type: CLEAR
})

export const getAllUserWorkspacesThunk = (workspaces) => async (dispatch) => {
	if (workspaces && workspaces.length) return
	const response = await fetch(`/api/workspaces/all`, {
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(getAllUserWorkspacesAction(data.workspaces));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return response
	}
};

export const createSingleWorkspaceThunk = (name) => async (dispatch) => {
	const response = await fetch(`/api/workspaces/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name })
	});

	if (response.ok) {
		const data = await response.json();
		await dispatch(createSingleWorkspaceAction(data));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return response
	}
};

export const updateSingleWorkspaceThunk = (name, workspaceId) => async (dispatch) => {
	const response = await fetch(`/api/workspaces/${workspaceId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name })
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateSingleWorkspaceAction(data.workspace));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return response
	}
};

const initialState = { allWorkspaces: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_USER_WORKSPACES: {
			const newState = { ...state, allWorkspaces: {} }
			action.payload.map(workspace => newState.allWorkspaces[workspace.id] = workspace)
			return newState;
		}
		case CREATE_SINGLE_WORKSPACE: {
			const newState = { ...state }
			newState.allWorkspaces[action.payload.id] = action.payload
			return newState
		}
		case CLEAR: {
			return initialState;
		}
		default:
			return state;
	}
}
