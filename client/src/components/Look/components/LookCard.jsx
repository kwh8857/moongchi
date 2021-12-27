import React, { useEffect, useRef } from "react";

function LookCard({
  data: { category, title, content, image, link },
  handleScroll,
}) {
  const dom = useRef(null);
  useEffect(() => {
    let observer;
    const { current } = dom;
    if (current) {
      observer = new IntersectionObserver(
        (e) => {
          handleScroll(e, dom);
        },
        {
          threshold: 0.2,
          root: null,
          rootMargin: "0px",
        }
      );
      observer.observe(current);

      return () => observer && observer.disconnect();
    }
  }, [dom, handleScroll]);
  return (
    <div className="card" ref={dom}>
      <div className="tag">{category}</div>
      <div className="title">{title}</div>
      <div className="sub">{content}</div>
      <a
        href={link}
        className="image"
        rel="noreferrer"
        target={"_blank"}
        style={{ backgroundImage: `url(${image.url})` }}
      >
        <figure>
          <img src="/assets/look/play.svg" alt="" />
        </figure>
      </a>
    </div>
  );
}

export default LookCard;
