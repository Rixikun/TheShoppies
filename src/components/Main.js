import React, { useState, useEffect } from "react";
import Axios from "axios";

import {
  Search,
  Results,
  Nominations,
  Banner,
  Spinner,
  SingleMovie,
  Pages,
} from "./index";
import axios from "axios";

import "../style/Pages.css";
import shoppies from "../assets/theshoppies.png";

const stored_userListStr = localStorage.getItem("userList");
const stored_userListArr = stored_userListStr?.length
  ? JSON.parse(stored_userListStr)
  : [];

const Main = (props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nominations, setNominations] = useState([...stored_userListArr]);
  const [hide, setHide] = useState(true);

  async function getFilm(searchTerm) {
    let URL = `https://www.omdbapi.com/?apikey=93261adf&s=${searchTerm}&type=movie`;
    if (page > 1) {
      URL += `&page=${page}`;
    }
    const res = await axios.get(URL);
    console.log("URL: ", URL);
    console.log("res: ", res);
    if (res.data.Response === "True") {
      setTimeout(() => {
        setData(res.data.Search);
        setLoading(false);
      }, 1000);
      setTotalResults(res.data.totalResults);
      setLastPage(Math.ceil(Number(res.data.totalResults) / 10));
    } else {
      console.log("Error", res.data.Error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      getFilm(search);
    }
  }, [loading]);

  function handlePageClick(pg, isEnd = false) {
    if (pg === "...") {
      return;
    } else if (!isEnd) {
      setPage(Number(pg));
      setLoading(true);
    } else {
      const newPg = Number(page) + Number(pg);
      if (newPg >= 1 && newPg <= lastPage) {
        setPage(newPg);
        setLoading(true);
      }
    }
  }

  return (
    <div className="main-container">
      <header>
        <div className="header-inner">
          <div>
            <h1>The Shoppies</h1>
            <img
              src={shoppies}
              alt="emmy award edited to hold an S"
              height="120px"
            />
          </div>
          <button onClick={() => setHide(!hide)}>View Nominations</button>
        </div>
      </header>
      {loading ? <Spinner /> : ""}
      {nominations.length === 5 ? <Banner /> : ""}
      <main>
        <Search search={search} setSearch={setSearch} setLoading={setLoading} />

        <Results
          data={data}
          nominations={nominations}
          setNominations={setNominations}
          setLoading={setLoading}
        />
      </main>
      <aside>
        <Nominations
          nominations={nominations}
          setNominations={setNominations}
          setLoading={setLoading}
          hide={hide}
          setHide={setHide}
        />
      </aside>
      <footer>
        {data.length ? (
          <Pages
            handlePageClick={handlePageClick}
            page={page}
            lastPage={lastPage}
            setPage={setPage}
            setLoading={setLoading}
            totalResults={totalResults}
          />
        ) : (
          ""
        )}
        <div>
          <p>
            Movie data from <a href="http://www.omdbapi.com/">OMDb API</a>
          </p>
          <p>
            Project by <a href="https://github.com/Rixikun">Lin Xia</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Main;
