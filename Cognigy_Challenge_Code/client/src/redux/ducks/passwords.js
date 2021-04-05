import { Creators as messages } from "./statusMessages";

export const Types = {
  PASSWORDS_GENERATE_REQUEST: "passwords/PASSWORDS_GENERATE_REQUEST",
  PASSWORDS_GENERATE_SUCCESS: "passwords/PASSWORDS_GENERATE_SUCCESS",
  PASSWORDS_GENERATE_FAIL: "passwords/PASSWORDS_GENERATE_FAIL",
  PASSWORDS_GENERATE_DELETE: "passwords/PASSWORDS_GENERATE_DELETE",
};

// Reducer
const INITIAL_STATE = {
  isLoading: false,
  passwords: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.PASSWORDS_GENERATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case Types.PASSWORDS_GENERATE_SUCCESS:
      return {
        ...state,
        passwords: action.payload,
        isLoading: false,
      };

    case Types.PASSWORDS_GENERATE_DELETE:
      return {
        ...state,
        passwords: [],
        isLoading: false,
      };

    case Types.PASSWORDS_GENERATE_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export const Creators = {
  getPasswords: (data) => {
    return async (dispatch) => {
      dispatch({ type: Types.PASSWORDS_GENERATE_REQUEST });
      try {
        const response = await fetch(`/api/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
          dispatch({
            type: Types.PASSWORDS_GENERATE_SUCCESS,
            payload: result.passwordsArr,
          });
          dispatch(
            messages.setMessage({
              status: response.status,
              message: result.msg,
            })
          );
        } else if (response.status === 400) {
          dispatch({ type: Types.PASSWORDS_GENERATE_FAIL });
          dispatch(
            messages.setMessage({
              status: response.status,
              message: result.msg,
            })
          );
        } else {
          dispatch({ type: Types.PASSWORDS_GENERATE_FAIL });
          dispatch(
            messages.setMessage({
              status: response.status,
              message: result.message,
            })
          );
        }
        return response.ok;
      } catch (error) {
        dispatch({ type: Types.PASSWORDS_GENERATE_FAIL });
        dispatch(
          messages.setMessage({
            status: "Erorr",
            message: "Something wrong happened !!!",
          })
        );
      }
    };
  },

  deletePasswords: () => {
    return async (dispatch) => {
      dispatch({ type: Types.PASSWORDS_GENERATE_DELETE });
    };
  },
};
