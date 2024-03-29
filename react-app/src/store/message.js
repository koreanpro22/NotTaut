// constants
const GET_ALL_CHANNEL_MESSAGES = "message/GET_ALL_CHANNEL_MESSAGES";
const DELETE_CHANNEL_MESSAGES = "message/DELETE_CHANNEL_MESSAGES";
const CREATE_SINGLE_MESSAGE = "message/CREATE_SINGLE_MESSAGE";
const UPDATE_SINGLE_MESSAGE = "message/UPDATE_SINGLE_MESSAGE";
const DELETE_SINGLE_MESSAGE = "message/DELETE_SINGLE_MESSAGE";
const CLEAR = "message/CLEAR";


const getAllChannelMessagesAction = (messages) => ({
	type: GET_ALL_CHANNEL_MESSAGES,
	payload: messages,
});

export const deleteChannelMessagesAction = (messages) => ({
	type: DELETE_CHANNEL_MESSAGES,
	payload: messages
})

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

export const getAllChannelMessagesThunk = (messages, channelId) => async (dispatch) => {
	if (messages.length) return
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

export const createSingleMessageThunk = (message) => async (dispatch) => {
	dispatch(createSingleMessageAction(message));

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
		case DELETE_CHANNEL_MESSAGES: {
			const messages = action.payload
			const newState = { messages: { ...state.messages } }
			messages.forEach(id => {
				delete newState.messages[id]
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
			newState.messages[message.id] = message
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
