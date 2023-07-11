const GET_ALL_USERS = "user/GET_ALL_USERS";
const GET_SINGLE_USER = "user/GET_SINGLE_USER";

const getSingleUserAction = (user) => ({
    type: GET_SINGLE_USER,
    payload: user
});

export const getSingleUserThunk = (email) => async (dispatch) => {
    const res = await fetch(`/api/users/single/${email}`)

    if (res.ok) {
        const data = await res.json()
        await dispatch(getSingleUserAction(data))
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_SINGLE_USER: {
            const user = action.payload
            newState[user.id] = user
            return newState
        }
        default:
            return state;
    }
}
