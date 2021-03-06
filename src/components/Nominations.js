import React from "react";
import "../style/Nominations.css";

const Nominations = (props) => {
  const { nominations, setNominations, setLoading, hide } = props;

  if (nominations.length === 5) {
    console.log("reached 5");
  }

  function handleRemove(e, idx) {
    e.preventDefault();
    setLoading(true);
    const res = [...nominations];
    res.splice(idx, 1);
    setTimeout(() => {
      setNominations(res);
      setLoading(false);
    }, 500);
    localStorage.setItem("userList", JSON.stringify(res));
  }

  const res = nominations.map((obj, idx) => {
    const { title, id, year } = JSON.parse(obj);

    return (
      <li key={idx}>
        <p>
          {idx + 1}.{" "}
          <a
            href={`https://www.imdb.com/title/${id}`}
            target="_blank"
            title={`${title}-${year}`}
            rel="noreferrer">
            {title}
          </a>{" "}
          <small>({year})</small>
        </p>
        <button onClick={(e) => handleRemove(e, idx)}>Remove</button>
      </li>
    );
  });
  return (
    <>
      {!hide ? (
        <div className={`nominations-container`}>
          <div className="nominations">
            <h2>Your Nominations</h2>
            <nav>
              {nominations.length ? (
                <ul className="nominations">{res}</ul>
              ) : (
                <small>No films nominated</small>
              )}
            </nav>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Nominations;
