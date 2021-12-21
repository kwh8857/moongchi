import React, { useState } from "react";
import styled from "styled-components";

const Temimg = styled.div`
  width: 100%;
  height: 181.7px;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
  & > .back {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: black;
    opacity: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & > figure {
    position: absolute;
    & > img {
      width: 56px;
      height: 56px;
    }
  }
`;

function DisplayImage({ content: { resize, url } }) {
  const [now, setNow] = useState(resize);
  return (
    <Temimg>
      <div className="back"></div>
      <figure>
        <img src="/assets/common/play.svg" alt="" />
      </figure>
      <img
        src={url}
        style={{ display: "none" }}
        onLoad={() => {
          setNow(url);
        }}
        alt=""
      />
      <img src={now} alt="" />
    </Temimg>
  );
}

export default React.memo(DisplayImage);
