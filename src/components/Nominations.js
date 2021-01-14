import React, { useState } from "react";
import "../style/Nominations.css";

const Nominations = (props) => {
  const { nominations, setNominations, setLoading, hide, setHide } = props;

  if (nominations.length === 5) {
    console.log("reached 5");
  }

  function handleRemove(e, idx) {
    e.preventDefault();
    const res = [...nominations];
    res.splice(idx, 1);
    setTimeout(() => {
      setNominations(res);
      setLoading(false);
    }, 1000);
    localStorage.setItem("userList", JSON.stringify(res));
  }

  const res = nominations.map((title, idx) => (
    <li key={idx}>
      <p>
        {idx + 1}. {title}
      </p>
      <button onClick={(e) => handleRemove(e, idx)}>Remove</button>
    </li>
  ));

  return (
    <>
      {!hide ? (
        <div className={`nominations-container`}>
          <div className="nominations">
            <h2>Your Nominations</h2>
            {nominations.length ? <ul className="nominations">{res}</ul> : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Nominations;