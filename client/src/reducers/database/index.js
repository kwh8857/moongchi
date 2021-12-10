const initialState = {
  /** database에 올리기전 정리하는 redux입니다 */
  key: undefined,
  editor: [
    {
      type: "context",
      content: "",
      id: `context-${
        new Date().getTime() - Math.floor(Math.random() * (100 - 1 + 1)) + 1
      }`,
    },
  ],
  ask: {
    title: "",
    name: "",
    password: 0,
    tel: "",
    status: false,
    timestamp: 0,
  },
  focusIdx: 0,
  videolist: [],
  deletelist: [],
  //결제하기
};
const database = (state = initialState, { type, payload, idx, index }) => {
  switch (type) {
    case "@layouts/ASK_TITLE": {
      return {
        ...state,
        ask: {
          ...state.ask,
          title: payload,
        },
      };
    }
    case "@layouts/ASK_NAME": {
      return {
        ...state,
        ask: {
          ...state.ask,
          name: payload,
        },
      };
    }
    case "@layouts/ASK_PASSWORD": {
      return {
        ...state,
        ask: {
          ...state.ask,
          password: payload,
        },
      };
    }
    case "@layouts/ASK_TIMESTAMP": {
      return {
        ...state,
        ask: {
          ...state.ask,
          timestamp: payload,
        },
      };
    }
    case "@layouts/INIT_KEY": {
      return {
        ...state,
        key: payload,
      };
    }
    case "@layouts/INIT_DELETELIS_FILE": {
      let arr = state.deletelist;
      arr.push(payload);

      return {
        ...state,
        deletelist: [...arr],
      };
    }
    case "@layouts/INIT_DELETELIST": {
      let arr = state.deletelist;
      const { url, resize } = payload;
      arr.push(url);
      arr.push(resize);
      return {
        ...state,
        deletelist: [...arr],
      };
    }
    case "@layouts/RESET": {
      state.videolist = [];
      return {
        ...state,
        editor: [
          {
            type: "context",
            content: "",
            id: `context-${
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
