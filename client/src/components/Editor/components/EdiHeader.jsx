import React from "react";
import Ftsize from "./Ftsize";
import Ftstyle from "./Ftstyle";
import Ftalign from "./Ftalign";
import Insert from "./Insert";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  top: 0;
  left: 0;
  background-color: white;
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: solid 1px #dbdbdb;
  align-items: center;
  position: absolute;
  z-index: 3000;
  button {
    background-color: unset;
  }
  .line {
    height: 29px;
    width: 1px;
    background-color: #dbdbdb;
  }

  .ftsize {
    position: relative;
    font-size: 15px;

    .now-ft {
      display: flex;
      width: 85px;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      & > img {
        width: 10.5px;
        height: 6px;
        margin-left: 7px;
        transform: translateY(2px);
      }
    }

    .ft-list {
      animation: box-open 0.5s;
      top: 32px;
      width: 85px;
      height: 292px;
      position: absolute;
      display: grid;
      row-gap: 17px;
      padding-top: 15px;
      padding-bottom: 23px;
      border: solid 1px #dbdbdb;
      z-index: 500;
      overflow: hidden;
      background-color: white;

      .ft-card {
        padding-left: 15.5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        background-color: white;

        .sky-circle {
          background-color: #3597ec;
          margin-left: 18.5px;
          width: 7px;
          height: 7px;
          border-radius: 7px;
        }
      }
    }
  }

  .ftstyle-wrapper {
    margin-right: 12.5px;
    position: relative;
    margin-left: 10.5px;
    display: grid;
    grid-template-columns: repeat(3, 29px);
    column-gap: 3px;

    .style-btn {
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 29px;

      & > img {
        width: 29px;
        height: 29px;
      }

      .color-box {
        bottom: 1px;
        right: 3px;
        position: absolute;
        width: 6px;
        height: 6px;
      }
    }

    .color-wrapper {
      padding: 7px;
      box-sizing: border-box;
      bottom: -71px;
      right: -135px;
      width: 162px;
      height: 61px;
      background-color: white;
      transition: ease-in-out 0.2s;
      position: absolute;
      border: solid 1px #dbdbdb;
      display: grid;
      grid-template-columns: repeat(6, 22px);
      row-gap: 3px;
      column-gap: 3px;

      .color-box {
        cursor: pointer;
        height: 22px;
        // border: solid 1px #dbdbdb;
        border-radius: 2px;
      }
    }
  }

  .ftalign-wrapper {
    margin-left: 15.5px;
    margin-right: 11.5px;
    display: grid;
    grid-template-columns: repeat(3, 29px);
    column-gap: 13px;

    .align-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      & > img {
        transition: ease-in-out 0.2s;
        width: 29px;
        height: 29px;
      }
    }
  }

  .insert-wrapper {
    margin-left: 26.5px;
    display: grid;
    column-gap: 7px;
    grid-template-columns: repeat(5, 80px);

    .test-img {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      .btn-img {
        cursor: pointer;
      }
      & > input::-webkit-file-upload-button {
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 538px) {
    top: 130px;
    transition: top 0.2s ease-in-out;
    z-index: 1000;
    .ftsize {
      .now-ft {
        width: 65.3px;
        font-size: 15px;
        font-weight: normal;
      }
      .mb-wrapper {
        position: absolute;
        left: 0;
        top: 32px;
        overflow: scroll;
        width: 100vw;
        z-index: 200;
        .ft-list {
          box-sizing: border-box;
          padding-top: 10px;
          padding-bottom: 13px;
          position: unset;
          animation: none;
          overflow: scroll;
          width: fit-content;
          height: 50px;
          padding: 0;
          align-items: center;
          background-color: unset;
          border: unset;
          display: flex;
          row-gap: 0;
          .ft-card {
            color: #a8a8a8;
            width: 60px;
            background-color: unset;
          }
        }
      }
    }
    .ftstyle-wrapper {
      column-gap: 0;
      .mb-color-wrapper {
        width: 100vw;
        position: absolute;
        left: -70px;
        bottom: -65px;
        height: 50px;
        overflow-x: scroll;
        .color-wrapper {
          padding: 7px;
          padding-right: 20px;
          box-sizing: border-box;
          bottom: unset;
          right: unset;
          width: fit-content;
          height: 50px;
          background-color: transparent;
          transition: ease-in-out 0.2s;
          border: unset;
          grid-template-columns: repeat(11, 29px);
          row-gap: 0;
          column-gap: 13px;

          .color-box {
            height: 29px;
            border-radius: 2px;
          }
        }
      }
    }
    .ftalign-wrapper {
      position: relative;
      width: 29px;
      display: block;
      margin: 0 15px;
      .align-btn {
        width: 29px;
      }
      .mobile-align {
        position: absolute;
        bottom: -50px;
        left: -80px;
        display: grid;
        grid-template-columns: repeat(3, 29px);
        column-gap: 29px;
        button {
          background-color: unset;
        }
      }
    }
    .insert-wrapper {
      margin-left: 12px;
      display: flex;
      .test-img {
        width: 89px;
        height: 33px;
      }
    }
  }
`;

function EdiHeader({ setIsUp, temKey, category, state, uid, urlList, agent }) {
  const mbNow = useSelector((state) => state.test.mobile);
  return (
    <Wrapper>
      <Ftsize agent={agent} mbnow={mbNow} />
      <div className="line" />
      <Ftstyle agent={agent} mbnow={mbNow} />
      <div className="line" />
      <Ftalign agent={agent} mbnow={mbNow} />
      <div className="line" />
      <Insert
        agent={agent}
        setIsUp={setIsUp}
        temKey={temKey}
        category={category}
        state={state}
        uid={uid}
        urlList={urlList}
      />
    </Wrapper>
  );
}

export default EdiHeader;
