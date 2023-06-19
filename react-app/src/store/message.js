// constants
const GET_CHANNEL_MESSAGES = "message/GET_CHANNEL_MESSAGES";
const GET_ALL_CHANNEL_MESSAGES = "message/GET_ALL_CHANNEL_MESSAGES";
const GET_SINGLE_MESSAGE = "message/GET_SINGLE_MESSAGE";
const CREATE_SINGLE_MESSAGE = "message/CREATE_SINGLE_MESSAGE";
const UPDATE_SINGLE_MESSAGE = "message/UPDATE_SINGLE_MESSAGE";
const DELETE_SINGLE_MESSAGE = "message/DELETE_SINGLE_MESSAGE";
const CLEAR = "message/CLEAR";

// const getChannelMessagesAction = (messages) => ({
// 	type: GET_CHANNEL_MESSAGES,
// 	payload: messages,
// });

const getAllChannelMessagesAction = (messages) => ({
	type: GET_ALL_CHANNEL_MESSAGES,
	payload: messages,
});

// const getSingleMessageAction = (message) => ({
// 	type: GET_SINGLE_MESSAGE,
// 	payload: message,
// });

const createSingleMessageAction = (message) => ({
	type: CREATE_SINGLE_MESSAGE,
	payload: message,
});

const updateSingleMessageAction = (text, messageId) => ({
	type: UPDATE_SINGLE_MESSAGE,
	payload: {
		text,
		messageId
	}
});

const deleteSingleMessageAction = (messageId) => ({
	type: DELETE_SINGLE_MESSAGE,
	payload: messageId,
});

export const clearMessage = () => ({
	type: CLEAR
})

export const getAllChannelMessagesThunk = (channelId) => async (dispatch) => {
	const response = await fetch(`/api/messages/all/${channelId}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getAllChannelMessagesAction(data.messages));
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

// export const getSingleMessageThunk = (messageId) => async (dispatch) => {
// 	const response = await fetch(`/api/messages/single/${messageId}`, {
// 		headers: {
// 			"Content-Type": "application/json",
// 		}
// 	});
// 	if (response.ok) {
// 		const data = await response.json();
// 		dispatch(getSingleMessageAction(data.message));
// 		return null;
// 	} else if (response.status < 500) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return data.errors;
// 		}
// 	} else {
// 		return response
// 	}
// };

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

export const updateSingleMessageThunk = ({ text, message_id}) => async (dispatch) => {
	dispatch(updateSingleMessageAction(text, message_id))
};

export const deleteSingleMessageThunk = (messageId) => async (dispatch) => {
	dispatch(deleteSingleMessageAction(messageId))
};


const initialState = { currentMessage: null, messages: {} };

export default function reducer(state = initialState, action) {
	switch (action.type) {
		// case GET_CHANNEL_MESSAGES: {
		// 	const newState = {}
		// 	newState.messages = action.payload
		// 	return newState
		// }
		case GET_ALL_CHANNEL_MESSAGES: {
			const messages = action.payload
			const newState = { messages: { ...state.messages } }
			messages.forEach(m => {
				const id = m.id
				newState.messages[id] = m
			});
			return newState;
		}
		// case GET_SINGLE_MESSAGE: {
			// 	const newState = { ...state, currentMessage: state.currentMessage, messages: [...state.messages] }
			// 	newState.currentMessage = action.payload
		// 	return newState;
		// }
		case CREATE_SINGLE_MESSAGE: {
			const message = action.payload
			const newState = { ...state, messages: { ...state.messages } }
			console.log(newState)
			newState.messages[message.id] = message
			console.log(newState)
			return newState;
		}
		case UPDATE_SINGLE_MESSAGE: {
			const newState = { ...state, messages: { ...state.messages } }
			newState.messages[action.payload.messageId].text = action.payload.text
			return newState;
		}
		case DELETE_SINGLE_MESSAGE: {
			const newState = { ...state, messages: { ...state.messages } }
			delete newState.messages[action.payload]
			return newState;
		}
		case CLEAR: {
			return initialState;
		}
		default:
			return state;
	}
}
