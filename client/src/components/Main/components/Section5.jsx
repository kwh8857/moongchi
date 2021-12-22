import React from "react";
import { useSelector } from "react-redux";
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
      white-space: pre-line;
    }
  }
  @media screen and (max-width: 1024px) {
    height: 668px;
    padding-top: 120px;
    & > .container {
      & > .title {
        font-size: 30px;
        line-height: 1.3;
      }
      & > .sub {
        font-size: 14px;
        margin-top: 14px;
      }
    }
  }
  @media screen and (max-width: 769px) {
    height: 1116px;
    padding-top: 120px;
    & > .container {
      text-align: center;
      & > figure {
        margin-top: 45px;
        & > img {
          width: 287.7px;
        }
      }
    }
  }
`;
function Section5() {
  const useragent = useSelector((state) => state.config.useragent);
  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          작은 업체도 <br /> 효율적으로 구축
        </div>
        <div className="sub">
          {useragent !== "mobile"
            ? `개별 어플리케이션 개발이나 높은 초기비용 없이
큰 기업이나 플랫폼의 역할을 스스로 구축할 수 있습니다.`
            : `개별 어플리케이션 개발이나 높은 초기비용
없이 큰 기업이나 플랫폼의 역할을 스스로
구축할 수 있습니다.`}
        </div>
        <figure>
          <img
            src={`/assets/main/section5/content${
              useragent === "mobile" ? "mb" : ""
            }.png"`}
            srcSet={`/assets/main/section5/content${
              useragent === "mobile" ? "mb" : ""
            }@2x.png 2x,/assets/main/section5/content${
              useragent === "mobile" ? "mb" : ""
            }@3x.png 3x`}
            alt=""
          />
        </figure>
      </div>
    </Wrapper>
  );
}

export default Section5;
