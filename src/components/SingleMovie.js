import React from "react";

const SingleMovie = (props) => {
  const { posterUrl, setToggleFocus } = props;

  return (
    <div
      className="singleMovie-container"
      onClick={() => setToggleFocus(false)}>
      <div>
        <img src={posterUrl} />
      </div>
    </div>
  );
};

export default SingleMovie;
