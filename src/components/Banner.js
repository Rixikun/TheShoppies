import React, { useState } from "react";
import "../style/Banner.css";

const Banner = (props) => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="banner-container">
      <div
        className={`banner ${!toggle ? "hide" : ""}`}
        onClick={() => setToggle(false)}>
        <h2>You've nominated 5 films!</h2>
      </div>
    </div>
  );
};

export default Banner;
