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
import TemplateLink from "./Template/TemplateLink";
import TemplateVideo from "./Template/TemplateVideo";
resetServerContext();

function Screen({ temKey, Fstore, Fstorage, state }) {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.database.editor);
  const deletelist = useSelector((state) => state.database.deletelist);
  const [focusIdx, setfocusIdx] = useState(0);
  const handleOnDragEnd = useCallback(
    (result) => {
      setfocusIdx(-1);
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
        setfocusIdx(-1);
        const arr = template.slice();
        arr.splice(idx, 1);
        if (state === "new") {
          Fstore.collection("editor").doc(temKey).update({ template: arr });
        }
        dispatch({
          type: "@layouts/CHANGE_EDITOR",
          payload: arr,
        });
      }
    },
    [template, dispatch, Fstore, temKey, state]
  );
  const __deleteImage = useCallback(
    (url, type, idx, data, resize) => {
      if (state === "new") {
        if (type === "IMAGE") {
          Fstorage.refFromURL(resize).delete();
        }
        Fstorage.refFromURL(url).delete();
      } else {
        let arr = deletelist.slice();
        const filt = arr.filter(
          (item) => item.type === type && item.content.url === url
        );
        if (filt.length === 0) {
          arr.push(data);
          dispatch({
            type: "@layouts/INIT_DELETELIST",
            payload: arr,
          });
        }
      }
      __deleteTemplate(idx);
    },
    [__deleteTemplate, Fstorage, state, deletelist, dispatch]
  );
  useEffect(() => {
    function deleteTem(event) {
      if (event.key === "Backspace" && template.length > 1 && focusIdx > -1) {
        const arr = template.slice();
        let nowTemplate = arr[focusIdx];
        if (nowTemplate.type !== "TITLE") {
          if (nowTemplate.type === "IMAGE" || nowTemplate.type === "FILE") {
            const { content, type } = nowTemplate;
            __deleteImage(content.url, type, focusIdx, content.resize);
          }

          __deleteTemplate(focusIdx);
        } else {
          arr.splice(focusIdx, 1);
          if (
            nowTemplate.type === "TITLE" &&
            focusIdx !== 0 &&
            nowTemplate.content.length === 0
          ) {
            dispatch({
              type: "@layouts/CHANGE_EDITOR",
              payload: arr,
            });
          }
        }
      }
    }
    document.addEventListener("keydown", deleteTem);
    return () => {
      document.removeEventListener("keydown", deleteTem);
    };
  }, [
    focusIdx,
    template,
    dispatch,
    temKey,
    Fstore,
    Fstorage,
    __deleteImage,
    __deleteTemplate,
  ]);
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tags" direction="vertical">
        {(provided) => (
          <div
            className="editor-screen"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {template.length > 0 ? (
              template.map(({ type, content, id }, idx) => {
                return (
                  <Draggable key={id} draggableId={id} index={idx}>
                    {(provided) => {
                      if (type === "IMAGE") {
                        return (
                          <TemplateImage
                            data={content}
                            key={idx}
                            idx={idx}
                            provided={provided}
                            setFocus={setfocusIdx}
                            template={template}
                            focusIdx={focusIdx}
                            __delete={__deleteImage}
                          />
                        );
                      } else if (type === "TITLE") {
                        return (
                          <TemplateTitle
                            key={idx}
                            data={content}
                            provided={provided}
                            idx={idx}
                            setFocus={setfocusIdx}
                            focusIdx={focusIdx}
                            __delete={__deleteTemplate}
                          />
                        );
                      } else if (type === "LINK" || type === "FILE") {
                        return (
                          <TemplateLink
                            key={idx}
                            data={content}
                            provided={provided}
                            idx={idx}
                            type={type}
                            template={template}
                            __delete={
                              type === "FILE" ? __deleteImage : __deleteTemplate
                            }
                          />
                        );
                      } else if (type === "VIDEO") {
                        return (
                          <TemplateVideo
                            key={idx}
                            data={content}
                            setFocus={setfocusIdx}
                            provided={provided}
                            idx={idx}
                            template={template}
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
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default React.memo(Screen);
