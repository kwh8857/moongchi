const initialState = {
  editor: {
    bold: false,
    color: undefined,
    align: "left",
    underline: false,
    size: 15,
    drag: undefined,
  },
  mobile: "",
  post: [],
  isKeyboard: false,
};
const test = (state = initialState, { type, payload, index }) => {
  switch (type) {
    case "@test/KEYBOARD": {
      let payl = state.isKeyboard;
      return {
        ...state,
        isKeyboard: !payl,
      };
    }
    case "@test/MOBILE": {
      return {
        ...state,
        mobile: payload,
      };
    }
    case "@test/DRAG_ELEMENT": {
      return {
        ...state,
        editor: {
          ...state.editor,
          drag: payload,
        },
      };
    }
    case "@test/CHANGE_SIZE": {
      return {
        ...state,
        editor: {
          ...state.editor,
          size: payload,
        },
      };
    }
    case "@test/CHANGE_UNDER": {
      return {
        ...state,
        editor: {
          ...state.editor,
          underline: payload,
        },
      };
    }
    case "@test/CHANGE_ALIGN": {
      return {
        ...state,
        editor: {
          ...state.editor,
          align: payload,
        },
      };
    }
    case "@test/CHANGE_COLOR": {
      return {
        ...state,
        editor: {
          ...state.editor,
          color: payload,
        },
      };
    }
    case "@test/CHANGE_BOLD": {
      // const arr = [...state.tempo]
      // arr.splice(index, 0, payload)
      return {
        ...state,
        editor: {
          ...state.editor,
          bold: payload,
        },
      };
    }
    case "@test/TESTING": {
      return {
        ...state,
        post: [...state.post, payload],
      };
    }
    default:
      return state;
  }
};
export default test;
