import { useState } from "react";
import BudgetMonthIncome from "./BudgetMonthIncome";
import BudgetMonthExpense from "./BudgetMonthExpense";

const BudgetMonthDisplay = ({ selectedYear, data, monthInformation }) => {
  // data for given month and year
  const dataOfYearAndMonth = [];
  for (const item of data) {
    if (
      item.date.getFullYear() === parseInt(selectedYear) &&
      item.date.getMonth() === monthInformation.monthId
    ) {
      const obj = {
        id: item.id,
        type: item.type,
        category: item.category,
        title: item.title,
        amount: parseFloat(item.amount),
        day: item.date.getDay(),
        month: item.date.getMonth(),
        year: item.date.getFullYear(),
      };
      dataOfYearAndMonth.push(obj);
    }
  }

  // all incomes and expenses for given month and year
  let incomes;
  let expenses;
  if (dataOfYearAndMonth.length > 0) {
    incomes = dataOfYearAndMonth.filter(
      (inc) => inc.type === "income" && inc.year === parseInt(selectedYear)
    );
    expenses = dataOfYearAndMonth.filter(
      (exp) => exp.type === "expense" && exp.year === parseInt(selectedYear)
    );
  } else {
    incomes = null;
    expenses = null;
  }

  const [monthIncomeTotal, setMonthIncomeTotal] = useState(0);
  const [monthExpenseTotal, setMonthExpenseTotal] = useState(0);

  const overallTotal = monthIncomeTotal - monthExpenseTotal;

  if (dataOfYearAndMonth.length === 0) {
    return (
      <div className="no-data-available">
        Für den Monat {monthInformation.fullLabel} {selectedYear} liegen keine
        Daten vor.
      </div>
    );
  } else {
    return (
      <div className="budget-month-canvas">
        <h2>
          Einnahmen/Ausgaben für {monthInformation.fullLabel} {selectedYear}
        </h2>
        <div className="budget-month-container">
          <BudgetMonthIncome
            dataOfYearAndMonth={dataOfYearAndMonth}
            incomes={incomes}
            getMonthIncomeTotal={setMonthIncomeTotal}
          />
          <BudgetMonthExpense
            dataOfYearAndMonth={dataOfYearAndMonth}
            expenses={expenses}
            getMonthExpenseTotal={setMonthExpenseTotal}
          />
        </div>
        <div className="budget-month-total">
          {overallTotal >= 0 ? (
            <div className="budget-month-total-income">
              <span>
                Gesamtgewinn für {monthInformation.fullLabel} {selectedYear}
                :&nbsp;
              </span>
              <span className="budget-month-positive-total">
                € {overallTotal.toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="budget-month-total-income">
              <span>
                Gesamtverlust für {monthInformation.fullLabel} {selectedYear}
                :&nbsp;
              </span>
              <span className="budget-month-negative-total">
                € {overallTotal.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default BudgetMonthDisplay;
