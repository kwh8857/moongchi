// Firebase의 Firestore Db를 사용하였습니다.
// Firestore는 NOSQL Document DB입니다.

const schema = {
  config: {
    popup: {
      //오피스에서 설정하는 팝업
      link: String,
      title: String,
      time: String, //게시 만료일
      content: String,
    },
    prevview: {
      //미리보기
      list: [
        {
          category: String,
          content: String,
          id: String,
          image: {
            resize: String,
            url: String,
          },
          link: String,
          timestamp: Number,
          title: String,
        },
      ],
    },
  },
  ask: {
    __id: {
      name: String,
      password: Number, //게시물 비번
      status: Boolean,
      tel: String,
      timestamp: Number,
      template: [
        {
          content: String,
          id: String,
          type: String, //TITLE
        },
        {
          content: {
            resize: String,
            url: String,
          },
          height: Number,
          width: Number,
          id: String,
          type: String, //IMAGE
        },
      ],
      answer: {
        //답변
        content: String,
        image: {
          name: String,
          resize: String,
          url: String,
        },
        timestamp: Number,
      },
    },
  },
  notice: {
    __id: {
      config: {
        isBlind: Boolean,
        isPin: Boolean, //게시물 고정
      },
      title: String,
      timestamp: Number,
      videoList: [
        {
          name: String,
          thumbnail: String,
          url: String,
        },
      ],
      template: [
        {
          content: String,
          id: String,
          type: String, // TITLE , VIDEO
        },
        {
          content: {
            resize: String,
            url: String,
          },
          width: Number,
          height: Number,
          id: String,
          type: String, // IMAGE
        },
        {
          content: {
            title: String,
            url: String,
          },
          id: String,
          type: String, // FILE , LINK
        },
      ],
      urlList: Array, //삭제 예정 템플릿 IMAGE or FILE
      view: Number, //조회수
    },
  },
  blog: Object, //notice와 동일
  download: {
    //포스 프로그램 다운로드 목록
    __id: {
      email: String,
      timestamp: Number,
    },
  },
};
