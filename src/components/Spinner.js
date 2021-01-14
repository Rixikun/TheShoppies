import "../style/Spinner.css";

const Spinner = (props) => {
  return (
    <div className="spinner-container">
      <div className="spinner-main">
        <div className="spinner-inner"></div>
        <div className="spinner-inner"></div>
        <div className="spinner-inner"></div>
      </div>
    </div>
  );
};

export default Spinner;
