// constants
const GET_CHANNEL_MESSAGES = "message/GET_CHANNEL_MESSAGES";
const GET_ALL_MESSAGES = "message/GET_ALL_MESSAGES";
const GET_SINGLE_MESSAGE = "message/GET_SINGLE_MESSAGE";
const CREATE_SINGLE_MESSAGE = "message/CREATE_SINGLE_MESSAGE";
const UPDATE_SINGLE_MESSAGE = "message/UPDATE_SINGLE_MESSAGE";
const DELETE_SINGLE_MESSAGE = "message/DELETE_SINGLE_MESSAGE";

const getChannelMessagesAction = (messages) => ({
	type: GET_CHANNEL_MESSAGES,
	payload: messages,
});

const getAllMessagesAction = (messages) => ({
	type: GET_ALL_MESSAGES,
	payload: messages,
});

const getSingleMessageAction = (message) => ({
	type: GET_SINGLE_MESSAGE,
	payload: message,
});

const createSingleMessageAction = (message) => ({
	type: CREATE_SINGLE_MESSAGE,
	payload: message,
});

const updateSingleMessageAction = (message) => ({
	type: UPDATE_SINGLE_MESSAGE,
	payload: message,
});

const deleteSingleMessageAction = (messageId) => ({
	type: DELETE_SINGLE_MESSAGE,
	payload: messageId,
});

export const getAllMessagesThunk = (channelId) => async (dispatch) => {
	console.log('hitting all messages thunk')
	const response = await fetch(`/api/messages/all/${channelId}`);
	console.log('response in message thunk ', response)
	if (response.ok) {
		const data = await response.json();
		console.log('data in message thunk ', data)
		dispatch(getAllMessagesAction(data.messages));
		return data.messages
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return response
	}
};

export const getSingleMessageThunk = (messageId) => async (dispatch) => {
	const response = await fetch(`/api/messages/single/${messageId}`, {
		headers: {
			"Content-Type": "application/json",
		}
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getSingleMessageAction(data.message));
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

export const createSingleMessageThunk = (message, channelId) => async (dispatch) => {
	const response = await fetch(`/api/messages/single/${channelId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(createSingleMessageAction(data.message));
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

export const updateSingleMessageThunk = (message, messageId) => async (dispatch) => {
	const response = await fetch(`/api/messages/single/${messageId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(message),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(updateSingleMessageAction(data.message));
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

export const deleteSingleMessageThunk = (messageId) => async (dispatch) => {
	const response = await fetch(`/api/messages/${messageId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		}
	});

	if (response.ok) {
		dispatch(deleteSingleMessageAction(messageId));
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


const initialState = { currentMessage: null, messages: [] };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_CHANNEL_MESSAGES: {
			const newState = {}
			newState.messages = action.payload
			return newState
		}
		case GET_ALL_MESSAGES: {
			console.log(action.payload)
			const newState = {}
			console.log('message payload ', action.payload)
			newState.messages = action.payload
			return newState;
		}
		case GET_SINGLE_MESSAGE: {
			const newState = { ...state, currentMessage: state.currentMessage, messages: [...state.messages] }
			newState.currentMessage = action.payload
			return newState;
		}
		case CREATE_SINGLE_MESSAGE: {
			const newState = { ...state, messages: [...state.messages] }
			newState.messages.push(action.payload)
			return newState;
		}
		case UPDATE_SINGLE_MESSAGE: {
			const newState = { ...state, messages: [...state.messages] }
			const index = newState.messages.findIndex(message => message.id === action.payload.id)
			newState.messages[index] = action.payload
			return newState;
		}
		case DELETE_SINGLE_MESSAGE: {
			const newState = { ...state, messages: [...state.messages] }
			// console.log(newState)
			newState.messages = newState.messages.filter(message => message.id !== action.payload)
			return newState;
		}
		default:
			return state;
	}
}
