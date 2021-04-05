export const Types = {
  SET_MESSAGE: "messages/SET_MESSAGE",
  CLEAR_MESSAGE: "messages/CLEAR_MESSAGE",
};

const INITIAL_STATE = {
  status: null,
  message: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SET_MESSAGE:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };

    case Types.CLEAR_MESSAGE:
      return { ...state, status: null, message: null };

    default:
      return state;
  }
}

export const Creators = {
  setMessage: (message) => {
    return (dispatch) => {
      dispatch({ type: Types.SET_MESSAGE, payload: message });
    };
  },

  clearMessage: () => {
    return (dispatch) => {
      dispatch({ type: Types.CLEAR_MESSAGE });
    };
  },
};
