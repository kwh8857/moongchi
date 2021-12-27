const initialState = {
  identification: {
    version: "0.0.1",
    state: "test",
  },
  toast: {
    isactive: false,
    msg: "",
  },
  isLogin: false,
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
    case "@config/isLogin": {
      return {
        ...state,
        isLogin: payload,
      };
    }
    case "@config/TOAST-OFF": {
      return {
        ...state,
        toast: {
          ...state.toast,
          isactive: false,
        },
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
