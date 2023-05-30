// constants
const GET_ALL_WORKSPACE = "channel/GET_ALL_WORKSPACE";
const GET_SINGLE_WORKSPACE = "channel/GET_SINGLE_WORKSPACE";
const CREATE_SINGLE_WORKSPACE = "channel/CREATE_SINGLE_WORKSPACE";
const CLEAR = "workspace/CLEAR";

const getAllWorkspaceAction = (workspaces) => ({
	type: GET_ALL_WORKSPACE,
	payload: workspaces,
});

const getSingleWorkspaceAction = (workspace) => ({
	type: GET_SINGLE_WORKSPACE,
	payload: workspace,
});

const createSingleWorkspaceAction = (workspace) => ({
	type: CREATE_SINGLE_WORKSPACE,
	payload: workspace,
});

export const clearWorkspace = () => ({
	type: CLEAR
})

export const getAllWorkspaceThunk = () => async (dispatch) => {
	const response = await fetch(`/api/workspaces/all`, {
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(getAllWorkspaceAction(data.workspaces));
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

export const getSingleWorkspaceThunk = (workspaceId) => async (dispatch) => {
	const response = await fetch(`/api/workspaces/single/${workspaceId}`, {
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(getSingleWorkspaceAction(data.workspace));
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



const initialState = { currentWorkspace: null, workspaces: [] };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_WORKSPACE: {
			const newState = { ...state, currentWorkspace: state.currentWorkspace }
			newState.workspaces = action.payload
			return newState;
		}
		case GET_SINGLE_WORKSPACE: {
			const newState = {}
			newState.currentWorkspace = action.payload
			return newState;
		}
		case CREATE_SINGLE_WORKSPACE: {
			const newState = { ...state }
			newState.currentWorkspace = action.payload
		}
		case CLEAR: {
			return initialState;
		}
		default:
			return state;
	}
}
