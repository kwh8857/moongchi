import * as actions from "../actions";

const initialState = {
  data: {},
  status: "test",
  payload: "",
  isLoading: false,
};

const config = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEARCH:
      return {
        ...state,
        payload: action.payload,
      };
    case actions.SEARCH_SUCCESS:
      return {
        ...state,
        status: action.data,
      };
    case actions.SEARCH_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default config;
