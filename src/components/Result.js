import React, { useState } from "react";
import "../style/App.css";
import "../style/Results.css";
import SingleMovie from "./SingleMovie";

const Result = (props) => {
  const { Title, Year, imdbID, Poster } = props.film;
  const { nominations, setNominations, setLoading } = props;
  const defaultPoster = `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg`;
  const posterUrl = Poster !== "N/A" ? Poster : defaultPoster;

  const [toggleFocus, setToggleFocus] = useState(false);

  function handleNominate() {
    const res = [...nominations];
    if (res.length < 5) {
      setLoading(true);
      const item = {
        title: Title,
        id: imdbID,
        year: Year,
      };
      res.push(JSON.stringify(item));
      setTimeout(() => {
        setNominations(res);
        setLoading(false);
        localStorage.setItem("userList", JSON.stringify(res));
      }, 800);
    } else {
      console.log("5 reached");
    }
  }

  function disableNomination() {
    let res = false;

    nominations.forEach((obj) => {
      const info = JSON.parse(obj);
      if (info.title === Title && info.id === imdbID) {
        res = true;
      }
    });

    return res;
  }

  return (
    <div className="result-container">
      <div className="img-container">
        <img
          src={posterUrl}
          onClick={() => setToggleFocus(!toggleFocus)}
          alt={`movie poster of ${Title}`}
        />
      </div>
      <div className="filmInfo-container">
        <p>
          <strong>
            <a
              href={`https://www.imdb.com/title/${imdbID}`}
              target="_blank"
              rel="noreferrer"
              title={`${Title}-${Year}`}>
              {Title}
            </a>
          </strong>
        </p>
        <p>({Year}) </p>
        <button
          value={Title}
          disabled={disableNomination()}
          onClick={handleNominate}>
          Nominate
        </button>
      </div>
      {toggleFocus ? (
        <SingleMovie
          Title={Title}
          posterUrl={posterUrl}
          setToggleFocus={setToggleFocus}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;
