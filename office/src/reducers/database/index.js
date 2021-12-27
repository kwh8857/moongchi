const initialState = {
  key: undefined,
  editor: [
    {
      type: "TITLE",
      content: "",
      id: `title-${
        new Date().getTime() - Math.floor(Math.random() * (100 - 1 + 1)) + 1
      }`,
    },
  ],
  focusIdx: 0,
  videolist: [],
  deletelist: [],
  answer: {
    image: {
      url: "",
      name: "",
      resize: "",
      key: "",
    },
    content: "",
  },
  question: {
    removelist: [],
  },
  preview: [
    {
      title: "",
      category: "",
      content: "",
      link: "",
      image: {
        url: "",
        resize: "",
      },
      timestamp: Date.now(),
    },
  ],
};
const database = (
  state = initialState,
  { type, idx, payload, index, resize }
) => {
  switch (type) {
    case "@database/QUESTION_REMOVE_RESET": {
      return {
        ...state,
        question: {
          ...state.question,
          removelist: [],
        },
      };
    }
    case "@database/QUESTION_REMOVE": {
      let arr = state.question.removelist;
      arr.push(payload);
      arr.push(resize);
      return {
        ...state,
        question: {
          ...state.question,
          removelist: [...arr],
        },
      };
    }
    case "@database/PREVIEW_IMAGE": {
      let arr = state.preview;
      arr[index].image = payload;
      return {
        ...state,
        preview: [...arr],
      };
    }
    case "@database/PREVIEW_LINK": {
      let arr = state.preview;
      arr[index].link = payload;
      return {
        ...state,
        preview: [...arr],
      };
    }
    case "@database/PREVIEW_CONTENT": {
      let arr = state.preview;
      arr[index].content = payload;
      return {
        ...state,
        preview: [...arr],
      };
    }
    case "@database/PREVIEW_CATEGORY": {
      let arr = state.preview;
      arr[index].category = payload;
      return {
        ...state,
        preview: [...arr],
      };
    }
    case "@database/PREVIEW_TITLE": {
      let arr = state.preview;
      arr[index].title = payload;
      return {
        ...state,
        preview: [...arr],
      };
    }
    case "@database/PREVIEW_RESET": {
      return {
        ...state,
        preview: initialState.preview,
      };
    }
    case "@database/PREVIEW": {
      return {
        ...state,
        preview: payload,
      };
    }
    case "@database/ANSWER_IMAGE": {
      return {
        ...state,
        answer: {
          ...state.answer,
          image: payload,
        },
      };
    }
    case "@database/ANSWER_RESET": {
      return {
        ...state,
        answer: initialState.answer,
      };
    }
    case "@layouts/INIT_KEY": {
      return {
        ...state,
        key: payload,
      };
    }
    case "@layouts/INIT_DELETELIST": {
      return {
        ...state,
        deletelist: payload,
      };
    }
    case "@layouts/RESET": {
      state.videolist = [];
      return {
        ...state,
        editor: [
          {
            type: "TITLE",
            content: "",
            id: `title-${
              new Date().getTime() -
              Math.floor(Math.random() * (100 - 1 + 1)) +
              1
            }`,
          },
        ],
      };
    }
    case "@layouts/UPDATE_VIDEO": {
      let arr = state.videolist;
      state.videolist[idx] = payload;
      return {
        ...state,
        videolist: [...arr],
      };
    }
    case "@layouts/INIT_VIDEO":
      return {
        ...state,
        videolist: payload,
      };
    case "@layouts/CHANGE_FOCUS":
      return {
        ...state,
        focusIdx: payload,
      };
    case "@layouts/CHANGE_EDITOR":
      return {
        ...state,
        editor: payload,
      };
    case "@layouts/CHANGE_TITLE": {
      var arr = state.editor;
      arr[idx].content = payload;
      return {
        ...state,
        editor: [...arr],
      };
    }
    case "@layouts/CHANGE_SUMMARY": {
      var str = state.editor;
      str[idx].content.text = payload;
      return {
        ...state,
        editor: [...str],
      };
    }
    case "@layouts/CHANGE_SUMMARY_IMAGE": {
      var edr = state.editor;
      edr[idx].content.images[index] = payload;
      return {
        ...state,
        editor: [...edr],
      };
    }
    default:
      return state;
  }
};
export default database;
