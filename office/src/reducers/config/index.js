const initialState = {
  identification: {
    version: "0.0.1",
    state: "test",
  },
  toast: "",
  isLoading: false,
};
const config = (state = initialState, { type, payload }) => {
  switch (type) {
    case "@config/isLoading": {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case "@config/TOAST": {
      return {
        ...state,
        toast: payload,
      };
    }
    default:
      return state;
  }
};
export default config;
