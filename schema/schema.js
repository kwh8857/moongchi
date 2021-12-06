const client = {
  ask: {
    key: {
      status: Boolean, //false or true 미답변,답변완료
      title: String, //제목
      name: String, //질문자 이름
      password: Number, //게시물 비밀번호
      tel: String, //연락처
      templates: [], //작성 내용
      timestamp: Number, //작성시간
    },
  },
  notice: {
    key: {
      title: String,
      timestamp: Number,
      view: Number,
      templates: [],
      isPin: Boolean, //핀여부
      isFile: Boolean, //파일여부
    },
  },
};
