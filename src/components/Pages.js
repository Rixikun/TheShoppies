import React from "react";

const Pages = (props) => {
  const {
    page,
    lastPage,
    handlePageClick,
    setPage,
    setLoading,
    totalResults,
  } = props;

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
          el
        ) : (
          idx + 1
        )
      ) : (
        <>{page < lastPage - 1 && page > 2 ? `.. ${page} ..` : el}</>
      )}
    </li>
  ));

  return (
    <div className="pages-container">
      <div className="pages">
        <ul>
          <li key={0} onClick={() => handlePageClick(-1, true)}></li>
          {res}
          <li key={lastPage + 1} onClick={() => handlePageClick(1, true)}></li>
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
                setPage(e.target.value);
                setLoading(true);
              }}></input>
          </div>
        ) : (
          ""
        )}
      </div>
      <small>{totalResults} result(s) found</small>
    </div>
  );
};

export default Pages;
