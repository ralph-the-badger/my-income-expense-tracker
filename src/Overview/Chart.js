import ChartBar from "./ChartBar";

const Chart = ({ monthDisplay, setMonthInformation }) => {
  // const displaySingleMonth = (distinctMonthData) => {
  //   // console.log(distinctMonthData);
  //   addMonthDisplay(distinctMonthData);
  // };

  return monthDisplay.map((month) => (
    <ChartBar
      id={month.monthId}
      value={month.budget}
      maxIncome={month.maxIncome}
      maxExpense={month.maxExpense}
      label={month.label}
      monthData={month}
      setMonthInformation={setMonthInformation}
    />
  ));
};

export default Chart;
