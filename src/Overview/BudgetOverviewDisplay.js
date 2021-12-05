import { useState } from "react";

import SelectYear from "./SelectYear";
import ExpensesOverviewChart from "./ExpensesOverviewChart";

const BudgetOverviewDisplay = ({
  data,
  setMonthInformation,
  displaySingleYear,
  setSelectedYear,
}) => {
  const [dropdownYear, setDropdownYear] = useState("2021");

  const dropdownChangeHandler = (selectedYear) => {
    setDropdownYear(selectedYear);
  };

  const filteredDataByYear = data.filter(
    (item) => item.date.getFullYear().toString() === dropdownYear
  );

  // const [monthData, setMonthData] = useState([]);

  // const setMonthInformation = (singleMonthData) => {
  //   // console.log(singleMonthData);
  //   setMonthInformation(singleMonthData);
  //   // setMonthData(singleMonthData);
  // };

  const yearToBeDisplayed = (selectedYear) => {
    // console.log(selectedYear);
    displaySingleYear(selectedYear);
  };

  // hier ist der wert!
  setSelectedYear(dropdownYear);

  return (
    <div className="budget-overview-canvas">
      <h2>Relativer Anteil von Ausgaben an Einnahmen</h2>
      <SelectYear
        onDropdownChangeHandler={dropdownChangeHandler}
        selectedYear={dropdownYear}
        byUserSelectedYear={yearToBeDisplayed}
      />
      <ExpensesOverviewChart
        filteredData={filteredDataByYear}
        setMonthInformation={setMonthInformation}
      />
    </div>
  );
};

export default BudgetOverviewDisplay;
