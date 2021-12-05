const ChartBar = ({
  id,
  value,
  maxIncome,
  maxExpense,
  label,
  monthData,
  setMonthInformation,
}) => {
  let budgetPercentage = 0;
  if (value !== 0) {
    if (maxIncome !== 0) {
      budgetPercentage = Math.round((maxExpense / maxIncome) * 100);
    } else {
      budgetPercentage = Math.round(0.00000000000000000000001);
    }
  }

  return (
    <>
      <div
        className={`chartbar month-${id}`}
        onClick={(event) => {
          event.preventDefault();
          if (event.target.classList[0] === "chart-bar__inner") {
            setMonthInformation(monthData);
          }
        }}
      >
        <div className={`chart-bar__label month-${id}-label`}>{label}</div>
        <div className={`chart-bar__inner month-${id}-inner`}>
          {budgetPercentage >= 100 ? (
            <div
              className="chart-bar__fill"
              style={{ height: `100%`, backgroundColor: "#8a0000" }}
            ></div>
          ) : (
            <div
              className="chart-bar__fill"
              style={{ height: `${budgetPercentage}%` }}
            ></div>
          )}
        </div>
        <div className="chart-bar__proportion">{budgetPercentage}%</div>
        <button
          type="button"
          id="submit"
          className="chart-bar__proportion__button button"
          onClick={(event) => {
            event.preventDefault();
            setMonthInformation(monthData);
          }}
        >
          Details
        </button>
      </div>
    </>
  );
};

export default ChartBar;
