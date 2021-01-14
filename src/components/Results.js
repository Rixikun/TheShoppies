import React from "react";
import "../style/App.css";
import "../style/Results.css";

import { Result } from "./index";

const Results = (props) => {
  const { data, nominations, setNominations, setLoading } = props;
  const res = data.map((film, idx) => {
    return (
      <Result
        key={idx}
        film={film}
        nominations={nominations}
        setNominations={setNominations}
        setLoading={setLoading}
      />
    );
  });

  return (
    <div className="results-container">
      {data.length ? (
        res
      ) : (
        <div className="placeholder-container">
          <img
            src="https://icon-library.com/images/movie-icon/movie-icon-6.jpg"
            alt="placeholder movie icon"
          />
          <p>No results</p>
        </div>
      )}
    </div>
  );
};

export default Results;
