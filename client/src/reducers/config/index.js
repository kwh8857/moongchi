// import * as actions from "../actions";

const initialState = {
  useragent: "",
  data: {},
  status: "test",
  payload: "",
  isLoading: false,
  popup: {
    ispos: false,
    type: "",
    id: "",
    password: "",
  },
};

const config = (state = initialState, action) => {
  switch (action.type) {
    case "USERAGENT":
      return {
        ...state,
        useragent: action.payload,
      };
    case "LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "POPUP":
      return {
        ...state,
        popup: action.payload,
      };
    default:
      return state;
  }
};
export default config;
