import { useState } from "react";
import categories from "./categories";
import incexpData from "./incexpData";

import IncomeExpenseForm from "./IncomeExpenseForm";
import BudgetOverviewDisplay from "./Overview/BudgetOverviewDisplay";
import BudgetMonthDisplay from "./Overview/BudgetMonthDisplay";

import "./App.css";

const myData = incexpData;

function App() {
  const [newIncomeExpense, setNewIncomeExpense] = useState(myData);
  const [monthInformation, setMonthInformation] = useState(false);
  const [selectedYear, setSelectedYear] = useState(false);

  const saveExpenseDataHandler = (newIncomeExpenseData) => {
    setNewIncomeExpense((existingData) => {
      return [newIncomeExpenseData, ...existingData];
    });
  };

  return (
    <div className="App">
      <div className="app-canvas">
        <h1>Einnahmen - Ausgaben</h1>
        <IncomeExpenseForm
          data={newIncomeExpense}
          categories={categories}
          onSaveIncomeExpense={saveExpenseDataHandler}
        />
        <BudgetOverviewDisplay
          data={newIncomeExpense}
          setMonthInformation={setMonthInformation}
          setSelectedYear={setSelectedYear}
        />
        {monthInformation ? (
          <BudgetMonthDisplay
            className={"budget-month-canvas"}
            selectedYear={selectedYear}
            monthInformation={monthInformation}
            data={newIncomeExpense}
          />
        ) : (
          <p>
            Bitte klicken Sie auf einen Button unterhalb des Monatsbalkens um
            sich die Details anzeigen zu lassen.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
