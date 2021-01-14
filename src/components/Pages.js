import React from "react";

const Pages = (props) => {
  const {
    page,
    lastPage,
    handlePageClick,
    setPage,
    setLoading,
    totalResults,
    search,
  } = props;

  function handleInput(e) {
    const newUrl = `${window.location.pathname}?search=${search}&page=${e.target.value}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setPage(e.target.value);
    setLoading(true);
  }

  const shortenPages =
    lastPage <= 6
      ? new Array(lastPage).fill(0)
      : [1, 2, "...", lastPage - 1, lastPage];
  const res = shortenPages.map((el, idx) => (
    <li
      key={idx + 1}
      onClick={() => handlePageClick(el > 0 || el === "..." ? el : idx + 1)}
      className={
        el > 0 && el === page
          ? "active"
          : el === 0 && idx + 1 === page
          ? "active"
          : ""
      }>
      {typeof el === "number" ? (
        el > 0 ? (
          <a href={`/?search=${search}&page=${el}`}>{el}</a>
        ) : (
          <a href={`/?search=${search}&page=${idx + 1}`}>{idx + 1}</a>
        )
      ) : (
        <>{page < lastPage - 1 && page > 2 ? `.. ${page} ..` : el}</>
      )}
    </li>
  ));

  return (
    <div className="pages-container">
      <nav className="pages">
        <ul>
          <li key={0} onClick={() => handlePageClick(-1, true)}>
            <a href={`/?search=${search}&page=${page - 1}`}></a>
          </li>
          {res}
          <li key={lastPage + 1} onClick={() => handlePageClick(1, true)}>
            <a href={`/?search=${search}&page=${page + 1}`}></a>
          </li>
        </ul>
        {lastPage > 6 ? (
          <div className="pageJump-container">
            <label htmlFor="pageJump-input">Page</label>
            <input
              id="pageJump-input"
              type="number"
              value={page}
              max={lastPage}
              min={1}
              onChange={(e) => {
                handleInput(e);
              }}></input>
          </div>
        ) : (
          ""
        )}
      </nav>
      <small>{totalResults} result(s) found</small>
    </div>
  );
};

export default Pages;
