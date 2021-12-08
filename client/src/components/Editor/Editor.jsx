// import React, { useState, useEffect, useCallback, useReducer } from "react";
// import "./css/index.css";
// import EdiHeader from "./components/EdiHeader";
// import Screen from "./components/Screen";
// import Popup from "./components/Popup";
// import { useDispatch, useSelector } from "react-redux";
// import { Beforeunload } from "react-beforeunload";
// import { useNavigate, useLocation } from "react-router-dom";
// import TitleSection from "./components/TitleSection";
// import { Animation } from "../styles/Animation";
// import Loading from "./components/Loading";
// import firebaseApp from "config/firebaseApp";
// import { __UPDATE_LOADING__, __UPDATE_TOAST__ } from "common/actionTypes";
// import SavePopup from "components/SavePopup/SavePopup";
// import { __UPDATE_TOPBANNER_STATE__ } from "components/Header/Topbanner/actionTypes/layouts";
// import MbSave from "./components/MbSave";
// const Fdatabase = firebaseApp.database();
// const Fstorage = firebaseApp.storage();
// function Editor({ type, id, basicinfo, isBack }) {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const history = useNavigate();
//   const category = location.pathname.split("/")[1];
//   const userAgent = useSelector((state) => state.config.identification.agent);
//   const {
//     session: { uid, nickname, email, urlList },
//   } = useSelector((state) => state.auth);
//   const temKey = useSelector((state) => state.database.key);
//   const productionPath = useSelector(
//     (state) => state.config.identification.state
//   );
//   const templates = useSelector((state) => state.database.editor);
//   const deleteList = useSelector((state) => state.database.deletelist);
//   function reducer(state, action) {
//     switch (action.type) {
//       case "RESET":
//         return {
//           title: undefined,
//           timestamp: undefined,
//           starCount: 0,
//         };
//       case "INIT":
//         return action.info;
//       case "TITLE":
//         return { ...state, title: action.title };

//       default:
//         throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }

//   const [info, patch] = useReducer(reducer, {
//     title: undefined,
//     timestamp: undefined,
//     starCount: 0,
//   });
//   const [isUp, setIsUp] = useState({
//     status: false,
//     type: "",
//   });
//   const [isSave, setIsSave] = useState(false);
//   const [save, setSave] = useState(undefined);
//   const __issueKey = useCallback(() => {
//     Fdatabase.ref(`users/${uid}/save/${category}`).once("value", (snapshot) => {
//       snapshot.ref
//         .child("/key")
//         .push("key")
//         .then((res) => {
//           snapshot.ref.update({ key: res.key });
//           dispatch({
//             type: "@layouts/INIT_KEY",
//             payload: res.key,
//           });
//           res.remove();
//         });
//     });
//   }, [dispatch, uid, category]);
//   const __removeUrl = useCallback(
//     (template) => {
//       return new Promise((resolve, reject) => {
//         if (urlList.length > 0) {
//           const clone = urlList.slice();
//           template.forEach(({ content: { resize, url }, type }) => {
//             if (type === "image" || type === "file") {
//               for (let i = 0; i < clone.length; i++) {
//                 const element = clone[i];
//                 if (element.resize === resize && element.url === url) {
//                   clone.splice(i, i + 1);
//                 } else if (element.url === url) {
//                   clone.splice(i, i + 1);
//                 }
//               }
//             }
//           });
//           Fdatabase.ref(`users/${uid}/urlList`)
//             .set(clone)
//             .then(() => {
//               resolve(true);
//             });
//         } else {
//           resolve(undefined);
//         }
//       });
//     },
//     [uid, urlList]
//   );
//   const __postProject = useCallback(
//     async (database) => {
//       let { timestamp } = database;
//       let nowTime;
//       if (type === "new") {
//         nowTime = Date.now();
//         database.timestamp = nowTime;
//       } else {
//         nowTime = timestamp;
//       }

//       let url;
//       if (productionPath === "test") {
//         url = "/project/make";
//       } else {
//         url =
//           "https://us-central1-projectquestion-2d800.cloudfunctions.net/clientApi/project/make";
//       }
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Allow-Control-Access-Origin": "*",
//         },
//         body: JSON.stringify({
//           purpose: type,
//           type: category,
//           database,
//           session: {
//             uid,
//             email,
//             nickname,
//           },
//           pid: temKey,
//         }),
//       })
//         .then((res) => res.json())
//         .then(async ({ status, msg }) => {
//           if (status) {
//             Fdatabase.ref(`users/${uid}/save/${category}`).once(
//               "value",
//               (snapshot) => {
//                 if (snapshot.exists()) {
//                   snapshot.ref.remove();
//                   if (type !== "new") {
//                     __removeUrl(database.templates).then(() => {
//                       // dispatch({
//                       //   type: __UPDATE_LOADING__,
//                       //   payload: false,
//                       // });
//                       history.push("/");
//                       // dispatch({
//                       //   type: __UPDATE_TOAST__,
//                       //   payload: {
//                       //     isActive: true,
//                       //     msg,
//                       //   },
//                       // });
//                     });
//                   } else {
//                     // dispatch({
//                     //   type: __UPDATE_LOADING__,
//                     //   payload: false,
//                     // });
//                     history.push("/");
//                     // dispatch({
//                     //   type: __UPDATE_TOAST__,
//                     //   payload: {
//                     //     isActive: true,
//                     //     msg,
//                     //   },
//                     // });
//                   }
//                 } else {
//                   // dispatch({
//                   //   type: __UPDATE_LOADING__,
//                   //   payload: false,
//                   // });
//                   history.push("/");
//                   // dispatch({
//                   //   type: __UPDATE_TOAST__,
//                   //   payload: {
//                   //     isActive: true,
//                   //     msg,
//                   //   },
//                   // });
//                 }
//               }
//             );
//           } else {
//             dispatch({
//               type: __UPDATE_LOADING__,
//               payload: false,
//             });
//             dispatch({
//               type: __UPDATE_TOAST__,
//               payload: {
//                 isActive: true,
//                 msg,
//               },
//             });
//           }
//         })
//         .catch((e) => {
//           dispatch({
//             type: __UPDATE_TOAST__,
//             payload: {
//               isActive: true,
//               msg: e,
//             },
//           });
//           dispatch({
//             type: __UPDATE_LOADING__,
//             payload: false,
//           });
//         });
//     },
//     [
//       uid,
//       type,
//       temKey,
//       category,
//       email,
//       nickname,
//       dispatch,
//       history,
//       productionPath,
//       __removeUrl,
//     ]
//   );

//   const __postData = useCallback(async () => {
//     dispatch({
//       type: __UPDATE_LOADING__,
//       payload: true,
//     });
//     if (category === "community") {
//       if (type === "new") {
//         Fdatabase.ref(`community/${temKey}`)
//           .update({
//             title: info.title,
//             author: nickname,
//             uid,
//             email,
//             starCount: 0,
//             templates,
//             finalUploadTimeStamp: Date.now(),
//           })
//           .then(() => {
//             Fdatabase.ref(`users/${uid}/save/${category}`).remove();
//             dispatch({
//               type: __UPDATE_LOADING__,
//               payload: false,
//             });
//             history.goBack();
//             dispatch({
//               type: __UPDATE_TOAST__,
//               payload: {
//                 isActive: true,
//                 msg: "게시물 등록이 완료되었습니다.",
//               },
//             });
//           });
//       } else {
//         await deleteList.forEach((item) => {
//           Fstorage.refFromURL(item).delete();
//         });
//         __removeUrl(templates).then(() => {
//           Fdatabase.ref(`community/${temKey}`)
//             .update({
//               title: info.title,
//               author: nickname,
//               uid,
//               email,
//               starCount: info.starCount,
//               templates,
//               finalUploadTimeStamp: info.timestamp,
//             })
//             .then(() => {
//               history.goBack();
//               dispatch({
//                 type: __UPDATE_LOADING__,
//                 payload: false,
//               });
//               dispatch({
//                 type: __UPDATE_TOAST__,
//                 payload: {
//                   isActive: true,
//                   msg: "게시물 수정이 완료되었습니다.",
//                 },
//               });
//             });
//         });
//       }
//     } else {
//       const db = Object.assign(basicinfo, { templates });
//       __postProject(db);
//     }
//   }, [
//     category,
//     nickname,
//     uid,
//     email,
//     templates,
//     history,
//     info,
//     __postProject,
//     basicinfo,
//     dispatch,
//     type,
//     temKey,
//     __removeUrl,
//     deleteList,
//   ]);
//   const __saveData = useCallback(() => {
//     Fdatabase.ref(`users/${uid}/save/${category}`)
//       .update(
//         category === "community"
//           ? { templates: templates, title: info.title }
//           : { templates: templates }
//       )
//       .then(() => {
//         dispatch({
//           type: __UPDATE_TOAST__,
//           payload: {
//             isActive: true,
//             msg: "임시저장이 완료되었습니다.",
//           },
//         });
//         history.push(category === "community" ? "/community" : "/");
//       });
//   }, [uid, category, templates, history, dispatch, info]);
//   useEffect(() => {
//     if (uid) {
//       if (type === "new") {
//         if (category === "community") {
//           Fdatabase.ref(`users/${uid}/save/${category}`).once(
//             "value",
//             (snapshot) => {
//               if (snapshot.exists() && snapshot.val().templates) {
//                 setSave(snapshot.val());
//                 setIsSave(true);
//               } else {
//                 __issueKey();
//                 patch({
//                   type: "RESET",
//                 });
//               }
//             }
//           );
//         }
//       } else {
//         Fdatabase.ref(`${category}/${id}`).once("value", (snapshot) => {
//           if (snapshot.exists()) {
//             const value = snapshot.val();
//             if (category === "community") {
//               patch({
//                 type: "INIT",
//                 info: {
//                   title: value.title,
//                   timestamp: value.finalUploadTimeStamp,
//                   starCount: value.starCount,
//                 },
//               });
//             }
//             dispatch({
//               type: "@layouts/CHANGE_EDITOR",
//               payload: value.templates
//                 ? value.templates
//                 : [
//                     {
//                       type: "context",
//                       content: "",
//                       id: `context-${
//                         new Date().getTime() -
//                         Math.floor(Math.random() * (100 - 1 + 1)) +
//                         1
//                       }`,
//                     },
//                   ],
//             });
//           }
//         });
//         dispatch({
//           type: "@layouts/INIT_KEY",
//           payload: id,
//         });
//       }
//     }

//     return () => {};
//   }, [dispatch, __issueKey, id, type, uid, category]); // eslint-disable-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     return () => {
//       dispatch({
//         type: "@layouts/RESET",
//       });
//     };
//   }, [dispatch]);

//   useEffect(() => {
//     const block = history.block((loc, action) => {
//       if (action === "POP") {
//         return window.confirm("게시물을 작성중입니다. 이동하시겠습니까?");
//       } else {
//         return true;
//       }
//     });
//     return block;
//   }, [history]);
//   useEffect(() => {
//     if (userAgent === "mobile") {
//       dispatch({
//         type: __UPDATE_TOPBANNER_STATE__,
//         payload: false,
//       });
//     }
//     return () => {};
//   }, [userAgent, dispatch]);
//   return (
//     <Beforeunload
//       onBeforeunload={(e) => {
//         e.preventDefault();
//       }}
//     >
//       <div className="editor">
//         <EdiHeader
//           setIsUp={setIsUp}
//           temKey={temKey}
//           category={category}
//           state={type}
//           uid={uid}
//           urlList={urlList}
//           agent={userAgent}
//         />
//         {userAgent === "mobile" ? <div className="mb-grey" /> : undefined}
//         <Animation
//           style={{
//             height: "auto",
//             paddingTop: userAgent !== "mobile" ? "100px" : 0,
//           }}
//         >
//           <TitleSection
//             agent={userAgent}
//             dispatch={patch}
//             isBack={isBack}
//             info={info}
//             post={__postData}
//             category={category}
//             state={type}
//             __save={__saveData}
//           />
//           <div className="editor-wrapper" style={{ paddingBottom: "180px" }}>
//             <Screen
//               temKey={temKey}
//               Fdatabase={Fdatabase}
//               Fstorage={Fstorage}
//               category={category}
//               state={type}
//               uid={uid}
//               urlList={urlList}
//             />
//           </div>
//           <Popup
//             isUp={isUp}
//             setIsUp={setIsUp}
//             temKey={temKey}
//             category={category}
//             state={type}
//             urlList={urlList}
//             uid={uid}
//           />
//         </Animation>
//       </div>
//       <Loading />
//       {isSave ? (
//         <SavePopup
//           patch={patch}
//           save={save}
//           Fdatabase={Fdatabase}
//           uid={uid}
//           setSave={setIsSave}
//           Fstorage={Fstorage}
//           category={category}
//           isSave={isSave}
//           __issueKey={__issueKey}
//         />
//       ) : undefined}
//       {userAgent === "mobile" ? (
//         <MbSave post={__postData} info={info} type={type} />
//       ) : undefined}
//     </Beforeunload>
//   );
// }

// export default Editor;
