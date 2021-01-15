import React, { useEffect } from "react";

const SingleMovie = (props) => {
  const { Title, posterUrl, setToggleFocus } = props;

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        setToggleFocus(false);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setToggleFocus]);

  return (
    <div
      className="singleMovie-container"
      onClick={() => setToggleFocus(false)}>
      <div>
        <img src={posterUrl} alt={`large poster of ${Title}`} />
      </div>
    </div>
  );
};

export default SingleMovie;
