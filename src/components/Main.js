import React, { useState, useEffect } from "react";

import { Search, Results, Nominations, Banner, Spinner, Pages } from "./index";
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

  useEffect(() => {
    let url = window.location.search;
    if (url.length) {
      url = url.slice(1);
      const queries = url.split("&");
      const title = queries[0].split("=")[1];
      const pg = queries.length > 1 ? queries[1].split("=")[1] : 1;
      setPage(pg);
      setSearch(title);
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    async function getFilm(searchTerm) {
      let URL = `https://www.omdbapi.com/?apikey=93261adf&s=${searchTerm}&type=movie`;
      if (page > 1) {
        URL += `&page=${page}`;
      }
      const res = await axios.get(URL);
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
    if (loading) {
      getFilm(search);
    }
  }, [loading, search, page]);

  function handlePageClick(pg, isEnd = false) {
    if (pg === "...") {
      return;
    } else if (!isEnd) {
      const newUrl = `${window.location.pathname}?search=${search}&page=${pg}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
      setPage(Number(pg));
      setLoading(true);
    } else {
      const newPg = Number(page) + Number(pg);
      if (newPg >= 1 && newPg <= lastPage) {
        const newUrl = `${window.location.pathname}?search=${search}&page=${newPg}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
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
            search={search}
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
