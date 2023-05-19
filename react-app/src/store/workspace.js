// constants
const GET_SINGLE_WORKSPACE = "channel/GET_SINGLE_WORKSPACE";

const getSingleWorkspaceAction = (workspace) => ({
	type: GET_SINGLE_WORKSPACE,
	payload: workspace,
});

export const getSingleWorkspaceThunk = (workspaceId) => async (dispatch) => {
    const response = await fetch(`/api/workspaces/all/${workspaceId}`, {
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
		case GET_SINGLE_WORKSPACE:{
            const newState = { ...state, currentWorkspace: state.single, workspaces: [...state.workspaces]}
            newState.currentWorkspace = action.payload
            return newState;
        }
		default:
			return state;
	}
}
