const functions = require("firebase-functions");
const firebaseApp = require("./config/firebaseModule");

const Fstore = firebaseApp.firestore();
const Fstoreage = firebaseApp.storage();
const bucketRef = Fstoreage.bucket("gs://moogchi.appspot.com");
exports.watcher = functions
  .region("asia-northeast1")
  .pubsub.schedule("1 0 * * *")
  .timeZone("Asia/Seoul")
  .onRun((context) => {
    console.log("schedule running");
    return scheduleTask();
  });

function scheduleTask() {
  noticeremoveUrl();
  blogremoveUrl();
  return true;
}

noticeremoveUrl();
blogremoveUrl();
// removeUrl();
function noticeremoveUrl() {
  console.log("공지사항 더미 이미지 삭제 시작");
  Fstore.collection("notice")
    .get()
    .then((res) => {
      res.forEach((item) => {
        const value = item.data();
        if (value.urlList) {
          value.urlList.forEach(({ type, content }) => {
            if (type === "IMAGE") {
              const { url, resize } = content;
              console.log(url);
              const urlFile = String(url)
                .replace(/%2F/g, "/")
                .split("?")[0]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/moogchi.appspot.com/o/"
                )[1];
              const reFile = String(resize)
                .replace(/%2F/g, "/")
                .split("?")[0]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/moogchi.appspot.com/o/"
                )[1];
              bucketRef
                .file(urlFile)
                .delete()
                .catch(() => {
                  console.log(`에러 발생${urlFile} , key:${item.id}`);
                });
              bucketRef
                .file(reFile)
                .delete()
                .catch(() => {
                  console.log(`에러 발생${reFile} , key:${item.id}`);
                });
            } else {
              const { url } = content;
              const urlFile = String(url)
                .replace(/%2F/g, "/")
                .split("?")[0]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/moogchi.appspot.com/o/"
                )[1];
              bucketRef
                .file(urlFile)
                .delete()
                .catch(() => {
                  console.log(`에러 발생${urlFile} , key:${item.id}`);
                });
            }
          });
          item.ref.update({
            urlList: [],
          });
        }
      });
    });
}

function blogremoveUrl() {
  console.log("블로그 더미 이미지 삭제 시작");
  Fstore.collection("blog")
    .get()
    .then((res) => {
      res.forEach((item) => {
        const value = item.data();
        if (value.urlList) {
          value.urlList.forEach(({ type, content }) => {
            if (type === "IMAGE") {
              const { url, resize } = content;
              const urlFile = String(url)
                .replace(/%2F/g, "/")
                .split("?")[0]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/moogchi.appspot.com/o/"
                )[1];
              const reFile = String(resize)
                .replace(/%2F/g, "/")
                .split("?")[0]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/moogchi.appspot.com/o/"
                )[1];
              bucketRef.file(urlFile).delete();
              bucketRef.file(reFile).delete();
            } else {
              const { url } = content;
              const urlFile = String(url)
                .replace(/%2F/g, "/")
                .split("?")[0]
                .split(
                  "https://firebasestorage.googleapis.com/v0/b/moogchi.appspot.com/o/"
                )[1];
              bucketRef.file(urlFile).delete();
            }
          });
          item.ref.update({
            urlList: [],
          });
        }
      });
    });
}
