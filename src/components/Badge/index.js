const Badge = ({ adult, status, vote_average }) => {
  return (
    <>
      <div className="d-flex gap-2">
        <h4>
          <span
            className={`status-badge badge py-2 ps-0`}
            style={{ color: "#28a745" }}
          >
            {status}
          </span>
        </h4>
        <h4>
          <span
            className={`adult-badge badge py-2 pe-3 border border-2 border-white text-white`}
          >
            {adult ? "18+" : "18-"}
          </span>
        </h4>

        <h4>
          <span
            className={`vote_average-badge badge py-2 pe-3 border border-2 border-white  text-white`}
          >
            {vote_average ? vote_average.toFixed(1) : null}
          </span>
        </h4>
      </div>
    </>
  );
};

export default Badge;
