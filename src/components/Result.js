import React, { useState } from "react";
import "../style/App.css";
import "../style/Results.css";
import SingleMovie from "./SingleMovie";

const Result = (props) => {
  const { Title, Year, Type, imdbID, Poster } = props.film;
  const { nominations, setNominations, setLoading } = props;
  const defaultPoster = `https://everyfad.com/static/images/movie_poster_placeholder.29ca1c87.svg`;
  const posterUrl = Poster !== "N/A" ? Poster : defaultPoster;

  const [toggleFocus, setToggleFocus] = useState(false);

  function handleNominate(e) {
    e.preventDefault();
    const res = [...nominations];
    if (res.length < 5) {
      setLoading(true);
      res.push(e.target.value);
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

    nominations.forEach((title) => {
      if (title === Title) {
        res = true;
      }
    });

    return res;
  }

  return (
    <div className="result-container">
      <div className="img-container">
        <img src={posterUrl} onClick={() => setToggleFocus(!toggleFocus)} />
      </div>
      <div className="filmInfo-container">
        <p>
          <strong>
            <a href={`https://www.imdb.com/title/${imdbID}`} target="_blank">
              {Title}
            </a>
          </strong>
        </p>
        <p>({Year}) </p>
        <button
          value={Title}
          disabled={disableNomination()}
          onClick={(e) => handleNominate(e)}>
          Nominate
        </button>
      </div>
      {toggleFocus ? (
        <SingleMovie posterUrl={posterUrl} setToggleFocus={setToggleFocus} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Result;
