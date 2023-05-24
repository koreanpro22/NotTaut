// constants
const GET_ALL_CHANNELS = "channel/GET_ALL_CHANNELS";
const GET_SINGLE_CHANNEL = "channel/GET_SINGLE_CHANNEL";
const CREATE_SINGLE_CHANNEL = "channel/CREATE_SINGLE_CHANNEL";
const UPDATE_SINGLE_CHANNEL = "channel/UPDATE_SINGLE_CHANNEL";
const DELETE_SINGLE_CHANNEL = "channel/DELETE_SINGLE_CHANNEL";

const getAllChannelsAction = (channels) => ({
	type: GET_ALL_CHANNELS,
	payload: channels,
});

const getSingleChannelAction = (channel) => ({
	type: GET_SINGLE_CHANNEL,
	payload: channel,
});

const createSingleChannelAction = (channel) => ({
	type: CREATE_SINGLE_CHANNEL,
	payload: channel,
});

const updateSingleChannelAction = (channel) => ({
	type: UPDATE_SINGLE_CHANNEL,
	payload: channel,
});

const deleteSingleChannelAction = (channelId) => ({
	type: DELETE_SINGLE_CHANNEL,
	payload: channelId,
});


export const getAllChannelsThunk = (workspaceId) => async (dispatch) => {
    const response = await fetch(`/api/channels/all/${workspaceId}`, {
        headers: {
            "Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getAllChannelsAction(data.channels));
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

export const getSingleChannelThunk = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/single/${channelId}`, {
        headers: {
            "Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getSingleChannelAction(data.channel));
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

export const createSingleChannelThunk = (channel, workspaceId) => async (dispatch) => {
	const response = await fetch(`/api/channels/single/${workspaceId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(channel),
	});
	console.log(response)

	if (response.ok) {
		const data = await response.json();
		dispatch(createSingleChannelAction(data.channel));
		return data.channel
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return response
	}
};

export const updateSingleChannelThunk = (channel, channelId) => async (dispatch) => {
	const response = await fetch(`/api/channels/single/${channelId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(channel),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateSingleChannelAction(data.channel));
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

export const deleteSingleChannelThunk = (channelId) => async (dispatch) => {
	const response = await fetch(`/api/channels/${channelId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		dispatch(deleteSingleChannelAction(channelId));
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


const initialState = { currentChannel: null };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_SINGLE_CHANNEL:{
			console.log('hitting channel case')
			console.log(state.currentChannel)
            const newState = { ...state, currentChannel: state.currentChannel}
            newState.currentChannel = action.payload
			console.log(newState.currentChannel)
            return newState;
        }
		case CREATE_SINGLE_CHANNEL:{
            const newState = { ...state, currentChannel: state.currentChannel}
            newState.currentChannel = action.payload
            return newState;
        }
		case UPDATE_SINGLE_CHANNEL:{
            // const newState = { ...state, currentChannel: state.currentChannel}
			const newState = { currentChannel: action.payload }
            return newState;
        }
		case DELETE_SINGLE_CHANNEL: {
			console.log('state channel', state.channels)
			const newState = { ...state, currentChannel: null }
			// const index = newState.channels.findIndex(channel => channel.id === action.payload)
			// newState.channels.splice(index, 1)
			return newState
		}
		default:
			return state;
	}
}
