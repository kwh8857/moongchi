import React, { useState } from "react";
import styled from "styled-components";

const Temimg = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 43px;
  img {
    max-width: 100%;
    width: auto;
  }
`;

function DisplayImage({ content: { resize, url }, width }) {
  const [now, setNow] = useState(resize);
  return (
    <Temimg>
      <img
        src={url}
        style={{ display: "none" }}
        onLoad={() => {
          setNow(url);
        }}
        alt=""
      />
      <img
        src={now}
        alt=""
        style={now === resize ? { width: `${width}px` } : undefined}
      />
    </Temimg>
  );
}

export default React.memo(DisplayImage);
