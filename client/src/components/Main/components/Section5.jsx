import React from "react";
import styled from "styled-components";
const Wrapper = styled.section`
  height: 838px;
  background-color: #f7f8fa;
  padding-top: 181px;
  box-sizing: border-box;
  width: 100%;
  & > .container {
    & > .title {
      font-size: 42px;
      font-weight: bold;
      line-height: 1.43;
      font-family: "cafe24";
      color: #191f28;
    }
    & > .sub {
      margin-top: 20px;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.61;
      color: #191f28;
    }
  }
`;
function Section5() {
  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          작은 업체도 <br /> 효율적으로 구축
        </div>
        <div className="sub">
          개별 어플리케이션 개발이나 높은 초기비용 없이 <br /> 큰 기업이나
          플랫폼의 역할을 스스로 구축할 수 있습니다.
        </div>
        <figure>
          <img
            src="/assets/main/section5/content.png"
            srcSet="/assets/main/section5/content@2x.png 2x,/assets/main/section5/content@3x.png 3x"
            alt=""
          />
        </figure>
      </div>
    </Wrapper>
  );
}

export default Section5;
