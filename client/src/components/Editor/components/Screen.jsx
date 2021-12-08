import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Droppable,
  DragDropContext,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import TemplateImage from "./Template/TemplateImage";
import TemplateEmty from "./Template/TemplateEmty";
import TemplateTitle from "./Template/TemplateTitle";
import styled from "styled-components";
resetServerContext();

const Wrapper = styled.div`
  font-size: 15px;
  text-align: left;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 80px;
  #text-line {
    width: 100%;
    min-height: 30px;
  }

  .template-img {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
    height: 100%;
    position: relative;
    .remove-btn {
      width: 25px;
      position: absolute;
      right: 0;
      top: -33px;
      z-index: 20;
      cursor: pointer;
    }
    & > img {
      max-width: 100%;
      width: unset;
    }
  }
  .focus {
    border: solid 1px #3597ec;
  }
  .template-emty {
    width: 100%;
    height: 50px;
    cursor: text;
  }

  .link-wrapper {
    position: relative;
    .remove-btn {
      position: absolute;
      top: -33px;
      right: 0;
      width: 25px;
      cursor: pointer;
    }
    .link-template {
      background-color: white;
      margin: 20px 0;
      box-sizing: border-box;
      border-radius: 5px;
      width: 100%;
      border: solid 1px #3597ec;
      height: 53px;
      padding-left: 15.4px;
      padding-right: 21.3px;
      display: flex;
      align-items: center;
      position: relative;

      & > .link-asset {
        margin-right: 8.4px;
        width: 34.2px;
      }

      & > .file-asset {
        margin-right: 15.5px;
        width: 21px;
      }

      & > .link-title {
        font-size: 17px;
        font-weight: bold;
        color: #3597ec;
      }

      & > .link-play {
        position: absolute;
        right: 21.3px;
        width: 9.6px;
      }
    }
  }

  .template-title {
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
    min-height: 80px;

    .con-wrapper {
      outline: 0px solid transparent;
      cursor: text;

      p {
        line-height: 2;
      }
    }

    .dnd-icon {
      z-index: 10;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .active-blue {
    border: solid 2px #3597ec;
    width: calc(100% - 2px);
  }

  b {
    font-weight: bold;
  }
`;

function Screen({
  temKey,
  Fdatabase,
  Fstorage,
  category,
  state,
  uid,
  urlList,
}) {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.database.editor);
  const [foucsIdx, setFoucsIdx] = useState(0);
  const handleOnDragEnd = useCallback(
    (result) => {
      setFoucsIdx(-1);
      if (!result.destination) return;
      const currentTags = [...template];
      const beforeDragItemIndex = result.source.index;
      const afterDragItemIndex = result.destination.index;
      const removeTag = currentTags.splice(beforeDragItemIndex, 1);
      currentTags.splice(afterDragItemIndex, 0, removeTag[0]);

      dispatch({
        type: "@layouts/CHANGE_EDITOR",
        payload: currentTags,
      });
    },
    [template, dispatch]
  );
  const __deleteTemplate = useCallback(
    (idx) => {
      if (template.length > 1) {
        setFoucsIdx(-1);
        const arr = template.slice();
        arr.splice(idx, 1);
        dispatch({
          type: "@layouts/CHANGE_EDITOR",
          payload: arr,
        });
      }
    },
    [template, dispatch]
  );
  const __deleteImage = useCallback(
    (idx, resize, url) => {
      const arr = template.slice();
      arr.splice(idx, 1);
      if (state === "new") {
        Fstorage.refFromURL(resize).delete();
        Fstorage.refFromURL(url).delete();
        Fdatabase.ref(`users/${uid}/save/${category}`).update({
          templates: arr,
        });
      } else {
        const List = urlList
          .slice()
          .filter((item) => item !== url || item !== resize);
        if (List.length === urlList.length) {
          dispatch({
            type: "@layouts/INIT_DELETELIST",
            payload: {
              url,
              resize,
            },
          });
        } else {
          Fstorage.refFromURL(resize).delete();
          Fstorage.refFromURL(url).delete();
          Fdatabase.ref(`users/${uid}/urlList`).set(List);
        }
      }
      dispatch({
        type: "@layouts/CHANGE_EDITOR",
        payload: arr,
      });
    },
    [category, state, dispatch, uid, template, Fdatabase, Fstorage, urlList]
  );
  useEffect(() => {
    function deleteTem(event) {
      if (event.key === "Backspace" && template.length > 1 && foucsIdx > -1) {
        const arr = template.slice();
        let nowTemplate = arr[foucsIdx];
        if (nowTemplate.type !== "context") {
          setFoucsIdx(-1);
          if (nowTemplate.type === "image") {
            const { resize, url } = nowTemplate.content;
            __deleteImage(foucsIdx, resize, url);
          }
          // if (nowTemplate.type === 'video') {
          //   Fstorage.refFromURL(nowTemplate.content).delete();
          // }
          // if (nowTemplate.type === 'SUMMARY') {
          //   nowTemplate.content.images.forEach(({ resize, img }) => {
          //     Fstorage.refFromURL(resize).delete();
          //     Fstorage.refFromURL(img).delete();
          //   });
          // }

          dispatch({
            type: "@layouts/CHANGE_EDITOR",
            payload: arr,
          });
        } else {
          arr.splice(foucsIdx, 1);
          if (
            nowTemplate.type === "context" &&
            foucsIdx !== 0 &&
            nowTemplate.content.length === 0
          ) {
            dispatch({
              type: "@layouts/CHANGE_EDITOR",
              payload: arr,
            });
          }
          setFoucsIdx(-1);
        }
      }
    }
    document.addEventListener("keydown", deleteTem);
    return () => {
      document.removeEventListener("keydown", deleteTem);
    };
  }, [
    foucsIdx,
    template,
    dispatch,
    temKey,
    Fdatabase,
    Fstorage,
    category,
    state,
    uid,
    urlList,
    __deleteImage,
  ]);
  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={() => {
        if (navigator.userAgent.match(/iPhone/i)) {
          const ref = document.getElementsByClassName("edit-header");
          const mbgrey = document.getElementsByClassName("mb-grey");
          ref[0].style.position = "fixed";
          mbgrey[0].style.top = "181px";
          ref[0].style.top = "130px";
          mbgrey[0].style.position = `fixed`;
        }
      }}
    >
      <Droppable droppableId="tags" direction="vertical">
        {(provided) => (
          <Wrapper
            className="editor-screen"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {template.length > 0 ? (
              template.map(({ type, content, id }, idx) => {
                return (
                  <Draggable key={id} draggableId={id} index={idx}>
                    {(provided) => {
                      if (type === "image") {
                        return (
                          <TemplateImage
                            data={content}
                            key={idx}
                            idx={idx}
                            provided={provided}
                            setFocus={setFoucsIdx}
                            template={template}
                            focusIdx={foucsIdx}
                            __remove={__deleteImage}
                          />
                        );
                      } else if (type === "context") {
                        return (
                          <TemplateTitle
                            key={idx}
                            data={content}
                            provided={provided}
                            idx={idx}
                            setFocus={setFoucsIdx}
                            focusIdx={foucsIdx}
                            __delete={__deleteTemplate}
                          />
                        );
                      }
                    }}
                  </Draggable>
                );
              })
            ) : (
              <TemplateEmty />
            )}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(Screen);
