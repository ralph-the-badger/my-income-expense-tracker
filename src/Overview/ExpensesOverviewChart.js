import Chart from "./Chart";

const ExpensesOverviewChart = ({ filteredData, setMonthInformation }) => {
  const monthDisplay = [
    {
      monthId: 0,
      label: "Jan",
      fullLabel: "Januar",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 1,
      label: "Feb",
      fullLabel: "Februar",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 2,
      label: "Mär",
      fullLabel: "März",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 3,
      label: "Apr",
      fullLabel: "April",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 4,
      label: "Mai",
      fullLabel: "Mai",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 5,
      label: "Jun",
      fullLabel: "Juni",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 6,
      label: "Jul",
      fullLabel: "Juli",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 7,
      label: "Aug",
      fullLabel: "August",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 8,
      label: "Sep",
      fullLabel: "September",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 9,
      label: "Okt",
      fullLabel: "Oktober",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 10,
      label: "Nov",
      fullLabel: "November",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
    {
      monthId: 11,
      label: "Dez",
      fullLabel: "Dezember",
      budget: 0,
      maxIncome: 0,
      maxExpense: 0,
    },
  ];

  for (const data of filteredData) {
    const monthBudget = data.date.getMonth();
    if (data.type === "income") {
      monthDisplay[monthBudget].budget += data.amount;
      monthDisplay[monthBudget].maxIncome += data.amount;
    } else {
      monthDisplay[monthBudget].budget -= data.amount;
      monthDisplay[monthBudget].maxExpense += data.amount;
    }
  }

  // const showDistinctMonth = (clickedMonthData) => {
  //   // console.log(clickedMonthData);
  //   showMonthBelowBudgetOverview(clickedMonthData);
  // };

  return (
    <div className="chart-overview">
      <Chart
        monthDisplay={monthDisplay}
        setMonthInformation={setMonthInformation}
      />
    </div>
  );
};

export default ExpensesOverviewChart;
