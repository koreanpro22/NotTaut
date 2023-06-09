// constants
const GET_ALL_CHANNELS = "channel/GET_ALL_CHANNELS";
const CREATE_SINGLE_CHANNEL = "channel/CREATE_SINGLE_CHANNEL";
const UPDATE_SINGLE_CHANNEL = "channel/UPDATE_SINGLE_CHANNEL";
const DELETE_SINGLE_CHANNEL = "channel/DELETE_SINGLE_CHANNEL";
const SET_CURRENT_CHANNEL = "channel/SET_CURRENT_CHANNEL";
const ADD_CHANNEL_USER = "channel/ADD_CHANNEL_USER";
const CLEAR = "channel/CLEAR";
const CLEAR_CURRENT_CHANNEL = "channel/CLEAR_CURRENT_CHANNEL";

const getAllChannelsAction = (channels) => ({
	type: GET_ALL_CHANNELS,
	payload: channels,
});

// const getSingleChannelAction = (channel) => ({
// 	type: GET_SINGLE_CHANNEL,
// 	payload: channel,
// });

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

const setCurrentChannelAction = (channelId) => ({
	type: SET_CURRENT_CHANNEL,
	payload: channelId,
});

const addChannelUserAction = (user) => ({
	type: ADD_CHANNEL_USER,
	payload: user
})

export const clearChannel = () => ({
	type: CLEAR
})

export const clearCurrentChannel = () => ({
	type: CLEAR_CURRENT_CHANNEL
})

export const getAllChannelsThunk = (channels, workspaceId) => async (dispatch) => {
	if (channels && channels.length) return
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

// export const getSingleChannelThunk = (channelId) => async (dispatch) => {
//     const response = await fetch(`/api/channels/single/${channelId}`, {
//         headers: {
//             "Content-Type": "application/json",
// 		}
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(getSingleChannelAction(data.channel));
// 		return null;
// 	} else if (response.status < 500) {
//         const data = await response.json();
// 		if (data.errors) {
//             return data.errors;
// 		}
// 	} else {
//         return response
// 	}
// };

export const createSingleChannelThunk = (channel, workspaceId) => async (dispatch) => {
	const response = await fetch(`/api/channels/single/${workspaceId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(channel),
	});

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

export const addChannelUserThunk = (user) => async (dispatch) => {
	const response = await fetch(`/api/channels/single/${user}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addChannelUserAction(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return response
	}
}

export const setCurrentChannelThunk = (channelId) => async (dispatch) => {
	dispatch(setCurrentChannelAction(channelId))
};


const initialState = { currentChannel: null, allChannels: {} };

export default function reducer(state = initialState, action) {
	let newState = { ...state, allChannels: { ...state.allChannels } }
	switch (action.type) {
		case GET_ALL_CHANNELS: {
			action.payload.forEach(channel => {
				newState.allChannels[channel.id] = channel
			});
			return newState
		}
		case CREATE_SINGLE_CHANNEL:{
            newState.allChannels[action.payload.id] = action.payload
			newState.currentChannel = action.payload.id
            return newState;
        }
		case UPDATE_SINGLE_CHANNEL:{
			newState.allChannels[action.payload.id] = action.payload
            return newState;
        }
		case DELETE_SINGLE_CHANNEL: {
			delete newState.allChannels[action.payload]
			newState.currentChannel = null
			return newState
		}
		// case ADD_CHANNEL_USER: {
		// 	newState.allChannels[action.payload.channelId].channel_users =
		// }
		case SET_CURRENT_CHANNEL: {
			newState.currentChannel = action.payload
			return newState
		}
		case CLEAR: {
			return initialState
		}
		case CLEAR_CURRENT_CHANNEL: {
			newState.currentChannel = null
			return newState
		}
		default:
			return state;
	}
}
